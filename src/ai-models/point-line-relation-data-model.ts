import { normalizeValue, relativePosition } from "../kernel/core";
import { areaTriangle2d, orientation2d } from "../kernel/GeoUtils";
import { KLine } from "../kernel/line";
import { Vector } from "../kernel/vector";
import { LabelData, MinAndMax } from "./point-relation-model";

const getRandomPoint = (min: number, max: number): Vector => {
  const x = Math.random() * (max - min) + min;
  const y = Math.random() * (max - min) + min;

  return new Vector([x, y]);
};

const getStartAndEndIndex = (
  minIndex: number,
  maxIndex: number
): { startIndex: number; endIndex: number; testIndex: number } => {
  const startIndex =
    Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

  let endIndex =
    Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

  while (startIndex === endIndex) {
    endIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
  }

  const testIndex =
    Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

  return { startIndex, endIndex, testIndex };
};

const getEndAndStartAsTest = (
  points: Vector[],
  sampleCount: number
): LabelData[] => {
  const dataset: LabelData[] = [];

  const minIndex = 0;
  const maxIndex = points.length - 1;
  for (let i = 0; i < sampleCount; i++) {
    const { startIndex, endIndex } = getStartAndEndIndex(minIndex, maxIndex);

    let testIndex = endIndex;

    let relation: relativePosition = orientation2d(
      points[startIndex],
      points[endIndex],
      points[testIndex]
    );

    let ln = new KLine(points[startIndex], points[endIndex]);

    let lableData: LabelData = {
      origin_x: points[startIndex].get_x(),
      origin_y: points[startIndex].get_y(),
      end_x: points[endIndex].get_x(),
      end_y: points[endIndex].get_y(),
      dir_x: ln.dir.get_x(),
      dir_y: ln.dir.get_y(),
      testPt_x: points[testIndex].get_x(),
      testPt_y: points[testIndex].get_y(),
      area: areaTriangle2d(ln.start_point, ln.end_point, points[testIndex]),
      // isCollinear: 1,
      // distanceToLine: 0,
      relation: relation,
    };

    dataset.push(lableData);

    //origin
    testIndex = startIndex;

    relation = orientation2d(
      points[startIndex],
      points[endIndex],
      points[testIndex]
    );

    ln = new KLine(points[startIndex], points[endIndex]);

    lableData = {
      origin_x: points[startIndex].get_x(),
      origin_y: points[startIndex].get_y(),
      end_x: points[endIndex].get_x(),
      end_y: points[endIndex].get_y(),
      dir_x: ln.dir.get_x(),
      dir_y: ln.dir.get_y(),
      testPt_x: points[testIndex].get_x(),
      testPt_y: points[testIndex].get_y(),
      area: areaTriangle2d(ln.start_point, ln.end_point, points[testIndex]),
      // isCollinear: 1,
      // distanceToLine: 0,
      relation: relation,
    };

    dataset.push(lableData);
  }

  return dataset;
};

const getBehindBeyondBetweenTest = (
  points: Vector[],
  sampleCount: number,
  beyondStart: number,
  beyondEnd: number,
  behindStart: number,
  behindEnd: number
): LabelData[] => {
  const dataset: LabelData[] = [];

  const minIndex = 0;
  const maxIndex = points.length - 1;

  for (let i = 0; i < sampleCount; i++) {
    const { startIndex, endIndex } = getStartAndEndIndex(minIndex, maxIndex);

    //BEYOND
    const ln = new KLine(points[startIndex], points[endIndex]);
    const beyondT = Math.random() * (beyondEnd - beyondStart) + beyondStart;
    let testPt = ln.evaluate(beyondT);

    let relation = orientation2d(points[startIndex], points[endIndex], testPt);

    dataset.push({
      origin_x: ln.start_point.get_x(),
      origin_y: ln.start_point.get_y(),
      end_x: ln.end_point.get_x(),
      end_y: ln.end_point.get_y(),
      dir_x: ln.dir.get_x(),
      dir_y: ln.dir.get_y(),
      testPt_x: testPt.get_x(),
      testPt_y: testPt.get_y(),
      area: areaTriangle2d(ln.start_point, ln.end_point, testPt),
      // isCollinear: 1,
      // distanceToLine: ln.distanceTo(testPt),
      relation,
    });

    //behind
    const behindT = Math.random() * (behindEnd - behindStart) + behindStart;
    testPt = ln.evaluate(behindT);

    relation = orientation2d(points[startIndex], points[endIndex], testPt);

    dataset.push({
      origin_x: ln.start_point.get_x(),
      origin_y: ln.start_point.get_y(),
      end_x: ln.end_point.get_x(),
      end_y: ln.end_point.get_y(),
      dir_x: ln.dir.get_x(),
      dir_y: ln.dir.get_y(),
      testPt_x: testPt.get_x(),
      testPt_y: testPt.get_y(),
      area: areaTriangle2d(ln.start_point, ln.end_point, testPt),
      // isCollinear: 1,
      // distanceToLine: ln.distanceTo(testPt),
      relation,
    });

    //BETWEEN
    const t = Math.random() * (1 - 0) + 0;
    testPt = ln.evaluate(t);

    relation = orientation2d(points[startIndex], points[endIndex], testPt);
    dataset.push({
      origin_x: ln.start_point.get_x(),
      origin_y: ln.start_point.get_y(),
      end_x: ln.end_point.get_x(),
      end_y: ln.end_point.get_y(),
      dir_x: ln.dir.get_x(),
      dir_y: ln.dir.get_y(),
      testPt_x: testPt.get_x(),
      testPt_y: testPt.get_y(),
      area: areaTriangle2d(ln.start_point, ln.end_point, testPt),
      relation,
      // isCollinear: 1,
      // distanceToLine: ln.distanceTo(testPt),
    });
  }

  return dataset;
};

const getLeftAndRightAsTest = (
  points: Vector[],
  sampleCount: number
): LabelData[] => {
  const dataset: LabelData[] = [];

  const minIndex = 0;
  const maxIndex = points.length - 1;
  for (let i = 0; i < sampleCount * 2; i++) {
    const { startIndex, endIndex, testIndex } = getStartAndEndIndex(
      minIndex,
      maxIndex
    );

    //right
    let relation = orientation2d(
      points[startIndex],
      points[endIndex],
      points[testIndex]
    );

    while (
      relation !== relativePosition.right &&
      relation !== relativePosition.left
    ) {
      const { startIndex, endIndex, testIndex } = getStartAndEndIndex(
        minIndex,
        maxIndex
      );

      relation = orientation2d(
        points[startIndex],
        points[endIndex],
        points[testIndex]
      );
    }
    const ln = new KLine(points[startIndex], points[endIndex]);
    dataset.push({
      origin_x: points[startIndex].get_x(),
      origin_y: points[startIndex].get_y(),
      end_x: points[endIndex].get_x(),
      end_y: points[endIndex].get_y(),
      dir_x: ln.dir.get_x(),
      dir_y: ln.dir.get_y(),
      testPt_x: points[testIndex].get_x(),
      testPt_y: points[testIndex].get_y(),
      area: areaTriangle2d(ln.start_point, ln.end_point, points[testIndex]),
      relation,
      // isCollinear: 0,
      // distanceToLine: new Line(points[startIndex], points[endIndex]).distanceTo(
      //   points[testIndex]
      // ),
    });
  }

  return dataset;
};

export const generateDataset = (
  sampleCount: number,
  minRnage: number,
  maxRange: number,
  saveToJson?: boolean
): LabelData[] => {
  const dataset: LabelData[] = [];

  const points: Vector[] = [];
  //get sampleCount points
  for (let j = 0; j < sampleCount; j++) {
    points.push(getRandomPoint(minRnage, maxRange));
  }

  const relationTypeSampleCount = Math.ceil(sampleCount / 7);

  //realtion -> END & START
  const endStartDataset = getEndAndStartAsTest(points, relationTypeSampleCount);
  dataset.push(...endStartDataset);

  //relation -> LEFT & RIGHT
  const leftRightDataset = getLeftAndRightAsTest(
    points,
    relationTypeSampleCount
  );
  dataset.push(...leftRightDataset);

  //relation -> 'BEYOND,BEHIND,BETWEEN'
  const bbb = getBehindBeyondBetweenTest(
    points,
    relationTypeSampleCount,
    1.001,
    2,
    -0.001,
    -2
  );

  dataset.push(...bbb);

  if (saveToJson) {
    const json = JSON.stringify(dataset, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([json], { type: "application/json" });

    // Create a link element
    const link = document.createElement("a");

    // Create a URL for the Blob and set it as the href for the link
    link.href = URL.createObjectURL(blob);

    // Set the download attribute with the desired file name
    link.download = `dataset.json`;

    // Programmatically click the link to trigger the download
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Click the link to trigger the download

    // Clean up the URL object and remove the link element
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }

  return dataset;
};

export const normalizeDataset = (
  dataset: LabelData[]
): { dataset: LabelData[]; minAndMax: MinAndMax } => {
  // Initialize min and max values for each coordinate (x and y)
  // Initialize min and max values for each attribute
  let minOriginX = Number.POSITIVE_INFINITY,
    maxOriginX = Number.NEGATIVE_INFINITY;
  let minOriginY = Number.POSITIVE_INFINITY,
    maxOriginY = Number.NEGATIVE_INFINITY;
  let minEndX = Number.POSITIVE_INFINITY,
    maxEndX = Number.NEGATIVE_INFINITY;
  let minEndY = Number.POSITIVE_INFINITY,
    maxEndY = Number.NEGATIVE_INFINITY;
  let minDirX = Number.POSITIVE_INFINITY,
    maxDirX = Number.NEGATIVE_INFINITY;
  let minDirY = Number.POSITIVE_INFINITY,
    maxDirY = Number.NEGATIVE_INFINITY;
  let minTestPtX = Number.POSITIVE_INFINITY,
    maxTestPtX = Number.NEGATIVE_INFINITY;
  let minTestPtY = Number.POSITIVE_INFINITY,
    maxTestPtY = Number.NEGATIVE_INFINITY;
  let minArea = Number.POSITIVE_INFINITY,
    maxArea = Number.NEGATIVE_INFINITY;

  // First pass: find the min and max values for each attribute
  dataset.forEach((data) => {
    minOriginX = Math.min(minOriginX, data.origin_x);
    maxOriginX = Math.max(maxOriginX, data.origin_x);
    minOriginY = Math.min(minOriginY, data.origin_y);
    maxOriginY = Math.max(maxOriginY, data.origin_y);

    minEndX = Math.min(minEndX, data.end_x);
    maxEndX = Math.max(maxEndX, data.end_x);
    minEndY = Math.min(minEndY, data.end_y);
    maxEndY = Math.max(maxEndY, data.end_y);

    minDirX = Math.min(minDirX, data.dir_x);
    maxDirX = Math.max(maxDirX, data.dir_x);
    minDirY = Math.min(minDirY, data.dir_y);
    maxDirY = Math.max(maxDirY, data.dir_y);

    minTestPtX = Math.min(minTestPtX, data.testPt_x);
    maxTestPtX = Math.max(maxTestPtX, data.testPt_x);
    minTestPtY = Math.min(minTestPtY, data.testPt_y);
    maxTestPtY = Math.max(maxTestPtY, data.testPt_y);

    minArea = Math.min(minArea, data.area);
    maxArea = Math.max(maxArea, data.area);
  });

  const normalizedDataset = dataset.map((data) => ({
    ...data,
    origin_x: normalizeValue(data.origin_x, minOriginX, maxOriginX),
    origin_y: normalizeValue(data.origin_y, minOriginY, maxOriginY),
    end_x: normalizeValue(data.end_x, minEndX, maxEndX),
    end_y: normalizeValue(data.end_y, minEndY, maxEndY),
    dir_x: normalizeValue(data.dir_x, minDirX, maxDirX),
    dir_y: normalizeValue(data.dir_y, minDirY, maxDirY),
    testPt_x: normalizeValue(data.testPt_x, minTestPtX, maxTestPtX),
    testPt_y: normalizeValue(data.testPt_y, minTestPtY, maxTestPtY),
    area: normalizeValue(data.area, minArea, maxArea),
  }));

  return {
    dataset: normalizedDataset,
    minAndMax: {
      minOriginX,
      maxOriginX,
      minOriginY,
      maxOriginY,

      minEndX,
      maxEndX,
      minEndY,
      maxEndY,

      minDirX,
      maxDirX,
      minDirY,
      maxDirY,

      minTestPtX,
      maxTestPtX,
      minTestPtY,
      maxTestPtY,

      minArea,
      maxArea,
    },
  };
};
