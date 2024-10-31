import { Camera, Size } from "@react-three/fiber";
import { useEffect, useState } from "react";
import {
  BufferGeometry,
  Line3,
  LineBasicMaterial,
  Scene,
  Vector3,
  Line,
} from "three";
import { getPointOnMouseEvent } from "./moseEventHelpers";

const lineGeom = new BufferGeometry();
const lineMat = new LineBasicMaterial();
const ln = new Line(lineGeom, lineMat);

export const useDrawLine = (scene: Scene, camera: Camera, size: Size) => {
  const [line, setLine] = useState<Line3 | null>(null);

  useEffect(() => {
    const startPt = new Vector3();
    const endPt = new Vector3();

    const getDynamiceLine = (e: MouseEvent) => {
      const pt = getPointOnMouseEvent(e, camera, size);

      endPt.copy(pt);

      ln.geometry.setFromPoints([startPt, endPt]);
      ln.geometry.attributes.position.needsUpdate = true;
    };

    const getEndPoint = (e: MouseEvent) => {
      scene.remove(ln);
      setLine(new Line3(startPt, endPt));

      window.removeEventListener("mousemove", getDynamiceLine);
      window.removeEventListener("click", getEndPoint);
    };

    const getStartPoint = (e: MouseEvent) => {
      scene.add(ln);
      const pt = getPointOnMouseEvent(e, camera, size);

      startPt.copy(pt);

      window.addEventListener("mousemove", getDynamiceLine);
      window.addEventListener("click", getEndPoint);
      window.removeEventListener("click", getStartPoint);
    };

    window.addEventListener("click", getStartPoint);

    return () => {
      window.removeEventListener("click", getStartPoint);
      window.removeEventListener("mousemove", getDynamiceLine);
      window.removeEventListener("click", getEndPoint);
    };
  }, []);

  return line;
};
