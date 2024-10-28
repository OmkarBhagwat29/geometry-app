import {
  generateDataset,
  normalizeDataset,
} from "../ai-models/point-line-relation-data-model";
import { pointRelationModel } from "../ai-models/point-relation-model";
import { SnapOption } from "../components/toolbar/snap-options";

import { SnapSettings } from "../three/snapable/snap";
import ThreeEngine from "../three/threeEngine";
import { DrawType } from "./actions";

let threeStarted = false;
export const threeHandler = {
  three: null as ThreeEngine | null,

  start(canvas: HTMLCanvasElement | null) {
    if (canvas && !threeStarted) {
      this.three = new ThreeEngine(canvas);

      threeStarted = true;
    }
  },
  setSnapOptions(options: { type: SnapOption; isActive: boolean }[]) {
    const setting: SnapSettings = {
      snapTolerance: 0.5,
      active: false,
      near: false,
      end: false,
      point: false,
      mid: false,
    };

    options.forEach(({ type, isActive }) => {
      setting[type] = isActive;
    });

    this.three?.setSnapSettings(setting);
  },

  dispose() {

    this.three?.dispose();

    this.three = null;
  },

  draw(drawType: DrawType, isRecursive = false) {
    this.three?.draw(drawType, isRecursive);
  },

  test() {
    this.three?.test();
  },

  async generateLinePointRelData(model: pointRelationModel) {
    const modelFolderName = "point-line-model";

    const postUrl = `http://localhost:3000/api/ai/${modelFolderName}`;
    try {
      const data = generateDataset(
        model.sampleCount,
        model.minRange,
        model.maxRange,
        false
      );

      const normalizeData = normalizeDataset(data);
      console.log(normalizeData);

      const res = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(normalizeData),
      });

      if (!res.ok) {
        console.log(await res.json());
        return;
      }

      const { trainedModel, minAndMax } = await res.json();

      this.three?.prediction.setLinePointRelTrainModel(trainedModel, minAndMax);
      alert("model training completed!!!");
    } catch (er) {
      console.log(er);
    }
  },

  async findPointRelationToLine() {
    if (!this.three?.prediction.isLnPtRelModelAvailable) {
      const modelFolderName = "point-line-model";

      const getUrl = `http://localhost:3000/api/ai/${modelFolderName}`;

      try {
        const res = await fetch(getUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.log(await res.json());
          return;
        }

        const { trainedModel, minAndMax } = await res.json();
        //console.log(trainedModel);
        this.three?.prediction.setLinePointRelTrainModel(
          trainedModel,
          minAndMax
        );
      } catch (er) {
        console.log(er);
      }
    }

    console.log("running command");
    this.three?.findPointLineRel();
  },
};
