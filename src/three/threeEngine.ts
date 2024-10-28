import * as th from "three";

import { PredictResult } from "./ai/predict";

import { Snap, SnapSettings } from "./snapable/snap";
import SceneManager from "./scene-manager";

import { DrawType } from "../middleware/actions";
import { Drawable } from "./drawable/drawable";
import { Selection } from "./selection";
import { DrawableBase } from "./drawable/drawable-base";
import { runFindPointLineRel } from "./features/point-line-rel";
import { HSS_FacadeUnit } from "./products/facade/hss";

export default class ThreeEngine {
  private scene: th.Scene;

  private canvas: HTMLCanvasElement;

  public prediction: PredictResult = new PredictResult();

  private drawable: Drawable;

  constructor(canvas: HTMLCanvasElement) {
    const sceneManager = SceneManager.getInstance(canvas);

    this.scene = sceneManager.scene;

    this.canvas = sceneManager.canvas;

    this.drawable = new Drawable();
  }

  setSnapSettings(snapSettings: SnapSettings) {
    Snap.setSettings(snapSettings);
  }

  private onScreenDoubleClick = () => {
    if (!document.fullscreenElement) {
      //go fullscreen

      this.canvas!.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  addTestBox = () => {
    const lineGeometry = new th.BufferGeometry();
    const points = [];

    const point = new th.Vector3();

    for (let i = 0; i < 2; i++) {
      point.x += Math.random() - 5;
      point.y += 0;
      point.z += Math.random() - 5;
      // direction.normalize().multiplyScalar(10);

      //point.add(direction);
      points.push(point.x, point.y, point.z);
    }

    lineGeometry.setAttribute(
      "position",
      new th.Float32BufferAttribute(points, 3)
    );

    const lineMaterial = new th.LineBasicMaterial({
      color: Math.random() * 0xffffff,
    });

    const ln = new th.Line(lineGeometry, lineMaterial);
    this.scene?.add(ln);

    Selection.objects.push(ln);
    // console.log(ln);
  };

  dispose = () => {
    window.removeEventListener("dblclick", () => this.onScreenDoubleClick);

    //console.log("destroying");

    const scenManager = SceneManager.getInstance();

    this.drawable.dispose();

    scenManager.dispose();
  };

  draw = (drawAction: DrawType, isRecursive = false) => {
    DrawableBase.isRecursive = isRecursive;
    switch (drawAction) {
      case "LINE":
        this.drawable.drawLine("pink");

        break;
      case "POINT":
        this.drawable.drawPoint("orange");
        break;
      case "POLYLINE":
        this.drawable.drawPolyline("white");
        break;
      default:
        return;
    }
  };

  findPointLineRel = () => {
    runFindPointLineRel();
  };

  test = async () => {
    const unit = new HSS_FacadeUnit();
    await unit.load();
  };
}
