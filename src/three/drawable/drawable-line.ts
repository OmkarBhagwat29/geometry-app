import { GetMouseCoordinates, GetViewportCoordinates } from "../utils";
import SceneManager from "../scene-manager";
import * as th from "three";
import { Snap } from "../snapable/snap";
import { DrawableBase } from "./drawable-base";

export class DrawableLine extends DrawableBase {
  private static sm: SceneManager;

  private static line = new th.Line();

  private static startPt: th.Vector3 = new th.Vector3();
  private static endPt: th.Vector3 = new th.Vector3();

  static drawLine = () => {
    this.sm = SceneManager.getInstance();
    const lineGeom = new th.BufferGeometry();
    const lineMat = new th.LineBasicMaterial({
      color: this.color,
      linewidth: 1,
    });

    this.line = new th.Line(lineGeom, lineMat);
    this.line.frustumCulled = false;
    this.sm.scene.add(this.line);

    window.addEventListener("click", this.clickStartPoint);
  };

  private static clickStartPoint = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;

    if (clickedElement.tagName !== "CANVAS") {
      return;
    }

    const mouse = GetMouseCoordinates(
      event.clientX,
      event.clientY,
      this.sm.canvasWidth,
      this.sm.canvasHeight
    );

    if (Snap.foundSnapPoint) {
      this.startPt.copy(Snap.snapPoint);
    } else {
      this.startPt.copy(GetViewportCoordinates(this.sm.camera, mouse));
    }

    window.removeEventListener("click", this.clickStartPoint);

    window.addEventListener("click", this.clickEndPoint);
    window.addEventListener("mousemove", this.drawDynmicPoint);
  };

  private static clickEndPoint = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;

    if (clickedElement.tagName !== "CANVAS") {
      return;
    }

    this.sm.scene.remove(this.line);

    const lineGeometry = new th.BufferGeometry();
    const points = [];

    points.push(this.startPt.x, this.startPt.y, this.startPt.z);
    points.push(this.endPt.x, this.endPt.y, this.endPt.z);

    lineGeometry.setAttribute(
      "position",
      new th.Float32BufferAttribute(points, 3)
    );

    const lineMaterial = new th.LineBasicMaterial({
      color: this.color,
    });

    const ln = new th.Line(lineGeometry, lineMaterial);
    ln.userData = { color: this.color };
    this.sm.scene?.add(ln);

    if (this.onObjectCreated) {
      this.onObjectCreated(ln);
    }

    window.removeEventListener("mousemove", this.drawDynmicPoint);
    window.removeEventListener("click", this.clickEndPoint);
  };

  private static drawDynmicPoint = (event: MouseEvent) => {
    const mouse = GetMouseCoordinates(
      event.clientX,
      event.clientY,
      this.sm.canvasWidth,
      this.sm.canvasHeight
    );

    if (Snap.foundSnapPoint) {
      this.endPt.copy(Snap.snapPoint);
    } else {
      this.endPt.copy(GetViewportCoordinates(this.sm.camera, mouse));
    }

    this.line.geometry.setFromPoints([this.startPt, this.endPt]);
    this.line.geometry.attributes.position.needsUpdate = true;
  };
}
