import { Line3, Object3D, Vector2, Vector3 } from "three";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { getPolarCoordinate } from "../../kernel/core";

export const createLine = (
  startX: number,
  startY: number,
  lineLen: number,
  angle: number
): Line3 => {
  const { dX, dY } = getPolarCoordinate(startX, startY, lineLen, angle);

  const end = new Vector3(dX, dY, 0);

  return new Line3(new Vector3(startX, startY, 0), end);
};

export const toThickLineGeometry = (
  ln: Line3,
  color: string,
  linewidth: number
): Line2 => {
  const positions = [];

  positions.push(ln.start.x, ln.start.y, ln.start.z);

  positions.push(ln.end.x, ln.end.y, ln.end.z);

  const geometry = new LineGeometry();
  geometry.setPositions(positions);

  const goodMaterial = new LineMaterial({
    color,
    linewidth,
    alphaToCoverage: false,
  });

  var ln2 = new Line2(geometry, goodMaterial);

  return ln2;
};
