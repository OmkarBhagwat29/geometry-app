import * as th from "three";
import { GetMouseCoordinates, GetViewportCoordinates } from "../utils";
import SceneManager from "../scene-manager";
import { toLines } from "../converter/converter";

export type SnapSettings = {
  snapTolerance: number;
  active: boolean;
  near: boolean;
  end: boolean;
  point: boolean;
  mid: boolean;
};

export class Snap {
  private static settings: SnapSettings = {
    snapTolerance: 0.5,
    active: false,
    near: false,
    end: false,
    point: false,
    mid: false,
  };

  private static snapGeom = new th.BufferGeometry();
  private static snapMat = new th.PointsMaterial({
    color: "yellow",
    size: 5,
    sizeAttenuation: false,
  });

  private static thSnapPoint = new th.Points(this.snapGeom, this.snapMat);
  public static snapPoint: th.Vector3 = new th.Vector3();

  private static mousePoint: th.Vector3 = new th.Vector3();

  public static foundSnapPoint = false;

  private static sm: SceneManager;

  private static sceneLines: th.Line3[] = [];

  private static scenePoints: th.Vector3[] = [];

  static setSettings = (settings: SnapSettings) => {
    this.settings = settings;
  };

  static activateSnap = () => {
    this.sm = SceneManager.getInstance();
    this.setSceneLines();
    this.setScenePoints();

    //console.log(this.sceneLines);

    Snap.thSnapPoint.visible = false;
    Snap.thSnapPoint.frustumCulled = false;
    this.sm.scene.add(Snap.thSnapPoint);

    window.addEventListener("mousemove", this.start);
  };

  static addSceneLine = (obj: th.Line) => {
    const lns = toLines(obj);
    this.sceneLines.push(...lns);
  };

  static deactivateSnap = () => {
    this.sceneLines = [];
    this.scenePoints = [];
    window.removeEventListener("mousemove", this.start);
  };

  static clear = () => {
    this.sceneLines = [];
    this.scenePoints = [];
  };

  private static setSceneLines = () => {
    this.sm.scene.children
      .filter(
        (
          obj
        ): obj is th.Line<th.BufferGeometry, th.Material | th.Material[]> => {
          return (
            obj instanceof th.Line &&
            obj.type !== "AxesHelper" &&
            obj.type !== "GridHelper"
          ); // Check if object is an instance of THREE.Line
        }
      )
      .forEach(
        (lineObj: th.Line<th.BufferGeometry, th.Material | th.Material[]>) => {
          const lns = toLines(lineObj);
          this.sceneLines.push(...lns);
        }
      );
  };

  private static setScenePoints = () => {
    this.sm.scene.children
      .filter((obj): obj is th.Points => {
        return obj instanceof th.Points;
      })
      .forEach((objPt) => {
        const geom = objPt.geometry as th.BufferGeometry;
        if (geom.attributes.position) {
          const pos = geom.attributes.position.array;

          for (let i = 0; i < pos.length; i += 3) {
            const pt = new th.Vector3(pos[i], pos[i + 1], pos[i + 2]);

            const ptWorld = pt.applyMatrix4(objPt.matrixWorld);

            this.scenePoints.push(ptWorld);
          }
        }
      });
  };

  private static start = (event: MouseEvent) => {
    if (!this.settings.active) return;

    Snap.foundSnapPoint = false;
    const mouse = GetMouseCoordinates(
      event.clientX,
      event.clientY,
      this.sm.canvasWidth,
      this.sm.canvasHeight
    );

    this.mousePoint.copy(GetViewportCoordinates(this.sm.camera, mouse));

    this.snapEndPoint();
    this.snapNearestPoint();
    this.snapPointsPoint();
    this.snapMidPoint();

    if (Snap.foundSnapPoint) {
      Snap.thSnapPoint.geometry.setFromPoints([Snap.snapPoint]);
      Snap.thSnapPoint.geometry.attributes.position.needsUpdate = true;
      Snap.thSnapPoint.visible = true;
    } else {
      Snap.thSnapPoint.visible = false;
    }
  };

  static dispose = () => {
    window.removeEventListener("mousemove", (e) => this.start(e));
    this.sm.scene.remove(Snap.thSnapPoint);
    Snap.snapPoint = new th.Vector3();
  };

  private static snapEndPoint = () => {
    if (this.settings.end) {
      this.snapEndPointOfLines();
    }
    //TODO:: snap end points of the geometry basically mesh's outer edges end points
  };

  private static snapNearestPoint = () => {
    if (this.settings.near) {
      this.snapNearestPointOfLine();
    }
  };

  private static snapPointsPoint = () => {
    if (this.settings.point) {
      this.scenePoints.forEach((pt) => {
        if (
          pt.distanceToSquared(this.mousePoint) <= this.settings.snapTolerance
        ) {
          Snap.snapPoint.copy(pt);
          Snap.foundSnapPoint = true;
        }
      });
    }
  };

  private static snapMidPoint = () => {
    if (this.settings.mid) {
      this.snapLineMidPoint();
    }
  };

  private static snapLineMidPoint = () => {
    this.sceneLines.forEach((ln3) => {
      const center = new th.Vector3();
      ln3.getCenter(center);

      if (
        center.distanceToSquared(this.mousePoint) <= this.settings.snapTolerance
      ) {
        Snap.snapPoint.copy(center);
        Snap.foundSnapPoint = true;
      }
    });
  };

  private static snapEndPointOfLines = () => {
    this.sceneLines.forEach((ln3) => {
      ///ln3.closestPointToPoint(this.mousePoint, true, closestPt);

      const startDistance = this.mousePoint.distanceToSquared(ln3.start);
      const endDistance = this.mousePoint.distanceToSquared(ln3.end);

      if (startDistance <= this.settings.snapTolerance) {
        Snap.snapPoint.copy(ln3.start);
        Snap.foundSnapPoint = true;
      } else if (endDistance <= this.settings.snapTolerance) {
        Snap.snapPoint.copy(ln3.end);
        Snap.foundSnapPoint = true;
      }
    });
  };

  private static snapNearestPointOfLine = () => {
    this.sceneLines.forEach((ln3) => {
      let minDistance = Infinity;

      const testPt = new th.Vector3();
      ln3.closestPointToPoint(this.mousePoint, false, testPt);

      const distance = testPt.distanceToSquared(this.mousePoint);
      if (distance <= minDistance && distance < this.settings.snapTolerance) {
        minDistance = distance;
        Snap.snapPoint.copy(testPt);
        Snap.foundSnapPoint = true;
      }
    });
  };
}
