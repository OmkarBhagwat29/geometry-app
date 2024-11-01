import { useEffect, useState } from "react";
import {
  BufferGeometry,
  Camera,
  Line,
  Object3D,
  Plane,
  Points,
  PointsMaterial,
  Scene,
  Vector3,
} from "three";
import { Size, useFrame } from "@react-three/fiber";
import { GetMouseCoordinates, GetViewportCoordinates } from "../../utils";
import { Constant } from "../../constants";
import { generateIKLineProps, IkPoint, IKSystem } from "./IKSystem";

import { useModel } from "../../components/use-model";

import { GetDiwaliSetPoints } from "./diwali example/diwali";

Constant.cPlane = new Plane(new Vector3(0, 0, 1));

const geom = new BufferGeometry();
const mat = new PointsMaterial({
  color: "yellow",
  size: 1,
  sizeAttenuation: false,
});

const pointsGeom = new Points(geom, mat);

export const useIK = (scene: Scene) => {
  const [objects, setObjects] = useState<Object3D[] | null>(null);

  const { model } = useModel();
  let ikSys: IKSystem | null = null;

  const followPoints: IkPoint[] = [];

  useEffect(() => {
    if (model) {
      model.scale.set(1.25, 1.25, 1.25);
      model.position.y = 1.5;

      scene.add(pointsGeom);

      followPoints.push(...GetDiwaliSetPoints(model));

      ikSys = new IKSystem(generateIKLineProps(10));

      ikSys.addToScene(scene);
    }

    return () => {};
  }, [model]);

  let ptIndex = 0;

  const addPts: Vector3[] = [];
  useFrame(() => {
    if (!ikSys || followPoints.length == 0) return;

    if (ptIndex < followPoints.length) {
      //console.log("follow");
      ikSys.follow(followPoints[ptIndex].target);
      ikSys.update();
      ptIndex++;

      addPts.push(followPoints[ptIndex].target);
      pointsGeom.geometry.setFromPoints(addPts);
    }
  });

  if (ptIndex === followPoints.length) {
    return null;
  }

  return objects;
};
