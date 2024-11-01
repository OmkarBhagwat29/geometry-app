import {
  BufferGeometry,
  Object3D,
  PointsMaterial,
  Vector3,
  Points,
  Line,
  Scene,
} from "three";
import { IkPoint } from "../IKSystem";
import { toLines } from "../../../converter/converter";
import { insertIntermediatePoints } from "../../../helpers/point-helper";
import { getObjectsByNames } from "../../../utils";

const threshold = 0.1;
export const GetDiwaliSetPoints = (
  model: Object3D,
  scene?: Scene
): IkPoint[] => {
  const ikPts: IkPoint[] = [];
  const points: Vector3[] = [];

  const objs: Object3D[] = [];

  objs.push(...getObjectsByNames(model, ["h"]));
  objs.push(...getObjectsByNames(model, ["a1"]));
  objs.push(...getObjectsByNames(model, ["a1-"]));
  objs.push(...getObjectsByNames(model, ["p1"]));
  objs.push(...getObjectsByNames(model, ["p1-"]));
  objs.push(...getObjectsByNames(model, ["p2"]));
  objs.push(...getObjectsByNames(model, ["p2-"]));
  objs.push(...getObjectsByNames(model, ["y"]));
  objs.push(...getObjectsByNames(model, ["d"]));
  objs.push(...getObjectsByNames(model, ["d-"]));
  objs.push(...getObjectsByNames(model, ["i1"]));
  objs.push(...getObjectsByNames(model, ["w"]));
  objs.push(...getObjectsByNames(model, ["a2"]));
  objs.push(...getObjectsByNames(model, ["a2-"]));
  objs.push(...getObjectsByNames(model, ["l"]));
  objs.push(...getObjectsByNames(model, ["i2"]));

  // "a1",
  // "a1-",
  // "p1",
  // "p1-",
  // "p2",
  // "p2-",
  // "y",
  // "d",
  // "d-",
  // "i1",
  // "w",
  // "a2",
  // "a2-",
  // "l",
  // "i2",

  console.log(objs);

  objs.forEach((obj) => {
    if (obj instanceof Line) {
      const lns = toLines(obj);
      lns.forEach((l, index) => {
        const startWorld = l.start.clone();
        const endWorld = l.end.clone();

        model.localToWorld(startWorld);
        model.localToWorld(endWorld);

        const adjPts = insertIntermediatePoints(
          [startWorld, endWorld],
          threshold
        );

        adjPts.forEach((pt, index) => {
          let draw = true;
          if (index == 0 || index == adjPts.length - 1) {
            draw = false;
          }

          const ikP = new IkPoint(pt, draw);

          ikPts.push(ikP);
        });
      });
    }
  });

  if (scene) {
    // Define your threshold distance

    const adjustedPoints = insertIntermediatePoints(
      ikPts.map((iP) => iP.target),
      threshold
    );

    const geom = new BufferGeometry();
    const mat = new PointsMaterial({
      color: "yellow",
      size: 1,
      sizeAttenuation: false,
    });

    const pointsGeom = new Points(geom, mat);

    pointsGeom.geometry.setFromPoints(adjustedPoints);

    scene.add(pointsGeom);
  }

  return ikPts;
};
