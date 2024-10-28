import { Line, Object3D, Points } from "three";
import { DrawableLine } from "./drawable-line";
import { DrawablePoint } from "./drawable-point";
import { Selection } from "../selection";
import { Snap } from "../snapable/snap";
import { DrawablePolyline } from "./drawable-polyline";
import SceneManager from "../scene-manager";
import { getCentroid } from "../utils";
import { DrawableBase } from "./drawable-base";
import { Constant } from "../constants";

export class Drawable {
  private sm: SceneManager;
  constructor() {
    this.sm = SceneManager.getInstance();

    window.addEventListener("keydown", this.onEscape);
    window.addEventListener("contextmenu", this.onRightClick);
  }

  private onEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      DrawableBase.isRecursive = false;
    }
  };

  private onRightClick = (e: MouseEvent) => {
    e.preventDefault();
    DrawableBase.isRecursive = false;
  };

  dispose = () => {
    Selection.deactivateSelection();
    Snap.deactivateSnap();

    window.removeEventListener("keydown", this.onEscape);
    window.removeEventListener("contextmenu", this.onRightClick);
  };

  drawLine = (
    color: string = "white",
    onLineCreated?: (obj: Object3D) => void
  ) => {
    this.preProcessing();

    DrawableLine.color = color;
    DrawableLine.drawLine();

    DrawableLine.onObjectCreated = (obj) => {
      if (onLineCreated) {
        onLineCreated(obj as Line);
      }

      this.postProcessing(obj);
    };
  };

  drawPoint = (
    color: string = "white",
    onPointCreated?: (obj: Object3D) => void
  ) => {
    this.preProcessing();

    DrawablePoint.color = color;

    DrawablePoint.drawPoint();

    DrawablePoint.onObjectCreated = (obj) => {
      if (onPointCreated) {
        onPointCreated(obj as Points);
      }

      this.postProcessing(obj);

      if (DrawableBase.isRecursive) {
        setTimeout(() => {
          this.drawPoint(color, onPointCreated);
        }, 0);
      }
    };
  };

  drawPolyline = (
    color: string = "pink",
    onPolylineCreted?: (obj: Object3D) => void
  ) => {
    this.preProcessing();
    DrawablePolyline.color = color;
    DrawablePolyline.drwaPolyline();

    DrawablePolyline.onObjectCreated = (obj) => {
      if (onPolylineCreted) {
        onPolylineCreted(obj as Line);
      }

      this.postProcessing(obj);
    };
  };

  private preProcessing = () => {
    this.sm.canvas.style.cursor = Constant.cursorPath;

    Snap.activateSnap();
    Selection.inCommandmode = true;
  };

  private postProcessing = (obj: Object3D) => {
    Selection.objects.push(obj);
    Snap.deactivateSnap();
    Selection.inCommandmode = false;
    this.sm.canvas.style.cursor = "Default";

    const center = getCentroid(obj);

    if (center) {
      this.sm.xFromControls
        .getHelper()
        .position.set(center.x, center.y, center.z);
    }

    this.sm.xFromControls.attach(obj);
    this.sm.xFromControls.detach();
  };
}
