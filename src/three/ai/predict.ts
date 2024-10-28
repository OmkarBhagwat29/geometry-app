import * as tf from "@tensorflow/tfjs";
import { KLine } from "../../kernel/line";
import { Vector } from "../../kernel/vector";
import { normalizeValue, relativePosition } from "../../kernel/core";
import { areaTriangle2d, orientation2d } from "../../kernel/GeoUtils";
import { LabelData, MinAndMax } from "../../ai-models/point-relation-model";

export type PredictAction =
  | {
      type: "LINE_POINT_RELATION";
      payload: { line: KLine; testPt: Vector };
    }
  | { type: "LINE_LINE_INTERSECTION" };

export class PredictResult {
  private linePointRelTrainModel: tf.LayersModel | null = null;
  isLnPtRelModelAvailable: boolean = false;
  private minMax: MinAndMax | null = null;

  setLinePointRelTrainModel = async (model: string, minMax: MinAndMax) => {
    const parsedModel = JSON.parse(model);
    const trainedModel: tf.LayersModel = await tf.models.modelFromJSON(
      parsedModel
    );

    this.minMax = minMax;

    if (trainedModel) {
      this.linePointRelTrainModel = trainedModel;
      this.isLnPtRelModelAvailable = true;
    }
  };

  predict = (action: PredictAction): string => {
    switch (action.type) {
      case "LINE_POINT_RELATION": {
        const { line, testPt } = action.payload;
        const prediction = this.predicLinePointRelation(line, testPt);
        return prediction;
      }
      default:
        return "";
    }
  };

  private predicLinePointRelation = (line: KLine, testPt: Vector): string => {
    if (this.linePointRelTrainModel === null || this.minMax == null) return "";

    // const distanceToLine = line.distanceTo(testPt);
    // const isCollinear = Collinear(line.start_point, line.end_point, testPt)
    //   ? 1
    //   : 0;

    const origin_x = normalizeValue(
      line.start_point.get_x(),
      this.minMax!.minOriginX,
      this.minMax!.maxOriginX
    );

    const origin_y = normalizeValue(
      line.start_point.get_y(),
      this.minMax!.minOriginY,
      this.minMax!.maxOriginY
    );

    const end_x = normalizeValue(
      line.start_point.get_x(),
      this.minMax!.minEndX,
      this.minMax!.maxEndX
    );

    const end_y = normalizeValue(
      line.start_point.get_y(),
      this.minMax!.minEndY,
      this.minMax!.maxEndY
    );

    const dir_x = normalizeValue(
      line.dir.get_x(),
      this.minMax!.minDirX,
      this.minMax!.maxDirX
    );

    const dir_y = normalizeValue(
      line.dir.get_y(),
      this.minMax!.minDirY,
      this.minMax!.maxDirY
    );

    const testPt_x = normalizeValue(
      testPt.get_x(),
      this.minMax!.minTestPtX,
      this.minMax!.maxTestPtX
    );

    const testPt_y = normalizeValue(
      testPt.get_y(),
      this.minMax!.minTestPtY,
      this.minMax!.maxTestPtY
    );

    const area = areaTriangle2d(line.start_point, line.end_point, testPt);
    const normalizeArea = normalizeValue(
      area,
      this.minMax!.minArea,
      this.minMax!.maxArea
    );

    const kernelActualRel = orientation2d(
      new Vector([line.start_point.get_x(), line.start_point.get_y()]),
      new Vector([line.end_point.get_x(), line.end_point.get_y()]),
      new Vector([testPt.get_x(), testPt.get_y()])
    );

    const testFeature = [
      origin_x,
      origin_y,
      end_x,
      end_y,
      dir_x,
      dir_y,
      testPt_x,
      testPt_y,
      normalizeArea,
    ];

    const inputTensor = tf.tensor2d([testFeature], [1, 9]); //convert test data into input tensor

    const prediction = this.linePointRelTrainModel.predict(
      inputTensor
    ) as tf.Tensor;

    const info = prediction.argMax(-1).dataSync();
    console.log(info);
    const predictedIndex = info[0]; // Get the predicted class index

    console.log("kernel actual Rel ->", relativePosition[kernelActualRel]);

    const rel = relativePosition[predictedIndex];
    console.log("predicted relation ->", rel);

    // console.log(line.length);
    // console.log(testPt);
    return rel;
  };
}

const trainPointLineRel = async (data: LabelData[]) => {
  const features = data.map((item) => [
    item.origin_x,
    item.origin_y,
    item.end_x,
    item.end_y,
    item.dir_x,
    item.dir_y,
    item.testPt_x,
    item.testPt_y,
    item.area,
  ]);

  // Filter out any items where `relation` is undefined
  const labels = data
    .map((item) => item.relation)
    .filter((relation): relation is relativePosition => relation !== undefined);
  //console.log(labels);

  const featureTensor = tf.tensor2d(features, [data.length, 9]);

  const labelTensor = tf.tensor1d(labels);

  const model = tf.sequential();

  //input layer with 9 features and 16 units
  model.add(
    tf.layers.dense({ inputShape: [9], units: 16, activation: "relu" })
  );

  //hidden layer with 16 units
  model.add(tf.layers.dense({ units: 16, activation: "relu" }));

  //output layer with 7 units
  model.add(tf.layers.dense({ units: 7, activation: "softmax" }));

  model.compile({
    optimizer: tf.train.adam(),
    loss: "sparseCategoricalCrossentropy", // Use for multi-class classification
    metrics: ["accuracy"],
  });

  //train model
  const epochs = 50;
  const batchSize = 12;

  await model?.fit(featureTensor, labelTensor, {
    epochs,
    batchSize,
    validationSplit: 0.2,
    callbacks: tf.callbacks.earlyStopping({ patience: 5 }),
  });

  return model;
};
