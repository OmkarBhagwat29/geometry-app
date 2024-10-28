import { GetMouseCoordinates, GetViewportCoordinates } from "../utils";
import SceneManager from "../scene-manager";
import { Snap } from "../snapable/snap";
import { DrawableBase } from "./drawable-base";
import * as th from "three";

export class DrawablePoint extends DrawableBase {
  static thPoint: th.Points;
  static point: th.Vector3 = new th.Vector3();

  static sm: SceneManager;

  static drawPoint = () => {
    this.sm = SceneManager.getInstance();

    window.addEventListener("click", this.clickPoint);
  };

  private static clickPoint = (event: MouseEvent) => {
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
      this.point.copy(Snap.snapPoint);
    } else {
      this.point!.copy(GetViewportCoordinates(this.sm.camera, mouse));
    }

    const geom = new th.BufferGeometry();
    const mat = new th.PointsMaterial({
      color: this.color,
      size: 10.0,
      sizeAttenuation: false,
    });

    geom.setAttribute(
      "position",
      new th.Float32BufferAttribute(
        [this.point.x, this.point.y, this.point.z],
        3
      )
    );

    this.thPoint = new th.Points(geom, mat);
    this.thPoint.userData = { color: this.color };
    this.sm.scene.add(this.thPoint);

    if (this.onObjectCreated) {
      this.onObjectCreated(this.thPoint);
    }

    window.removeEventListener("click", this.clickPoint);
  };
}
