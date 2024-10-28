import { GetMouseCoordinates, GetViewportCoordinates } from "../utils";
import SceneManager from "../scene-manager";
import { Snap } from "../snapable/snap";
import { DrawableBase } from "./drawable-base";
import * as th from "three";

export class DrawablePolyline extends DrawableBase {
  private static sm: SceneManager;

  private static polyline = new th.Line();
  private static points: th.Vector3[] = [];

  static drwaPolyline = () => {
    const geom = new th.BufferGeometry();
    const mat = new th.LineBasicMaterial({ color: this.color });
    this.points = [];
    this.sm = SceneManager.getInstance();

    this.polyline = new th.Line(geom, mat);
    this.polyline.frustumCulled = false;
    this.sm.scene.add(this.polyline);

    window.addEventListener("click", this.clickPoint);

    window.addEventListener("contextmenu", this.exit);
  };

  private static exit = (event: MouseEvent) => {
    // Prevent the default right-click menu
    event.preventDefault();

    this.points.pop();

    this.sm.scene.remove(this.polyline);

    const geom = new th.BufferGeometry();
    const mat = new th.LineBasicMaterial({ color: this.color });

    geom.setAttribute(
      "position",
      new th.Float32BufferAttribute(
        this.points.flatMap((pt) => [pt.x, pt.y, pt.z]),
        3
      )
    );

    const ln = new th.Line(geom, mat);

    this.sm.scene.add(ln);

    if (this.onObjectCreated) {
      this.onObjectCreated(ln);
    }

    window.removeEventListener("click", this.clickPoint);
    window.removeEventListener("mousemove", this.mouseMove);
    window.removeEventListener("contextmenu", this.exit);
    Snap.clear();
  };

  private static mouseMove = (event: MouseEvent) => {
    if (this.points.length > 1) {
      this.points.pop();
    }
    const mouse = GetMouseCoordinates(
      event.clientX,
      event.clientY,
      this.sm.canvasWidth,
      this.sm.canvasHeight
    );

    const point = new th.Vector3();

    if (Snap.foundSnapPoint) {
      point.copy(Snap.snapPoint);
    } else {
      point.copy(GetViewportCoordinates(this.sm.camera, mouse));
    }

    this.points.push(point);
    this.polyline.geometry.setFromPoints(this.points);
    this.polyline.geometry.attributes.position.needsUpdate = true;
  };

  private static clickPoint = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;

    if (clickedElement.tagName !== "CANVAS") {
      return;
    }

    if (this.points.length > 1) Snap.addSceneLine(this.polyline);

    const mouse = GetMouseCoordinates(
      event.clientX,
      event.clientY,
      this.sm.canvasWidth,
      this.sm.canvasHeight
    );

    const point = new th.Vector3();

    if (Snap.foundSnapPoint) {
      point.copy(Snap.snapPoint);
    } else {
      point.copy(GetViewportCoordinates(this.sm.camera, mouse));
    }

    this.points.push(point);
    this.polyline.geometry.setFromPoints(this.points);
    this.polyline.geometry.attributes.position.needsUpdate = true;

    window.addEventListener("mousemove", this.mouseMove);
  };
}
