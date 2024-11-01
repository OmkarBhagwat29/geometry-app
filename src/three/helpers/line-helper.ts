import { Color, Float32BufferAttribute, Line3, Vector3 } from "three";
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
  linewidth: number,
  opacity: number = 0.5
): Line2 => {
  const positions = [];

  positions.push(ln.start.x, ln.start.y, ln.start.z);

  positions.push(ln.end.x, ln.end.y, ln.end.z);

  const geometry = new LineGeometry();
  geometry.setPositions(positions);

  const goodMaterial = new LineMaterial({
    color,
    linewidth,
    opacity,
    alphaToCoverage: true,
    transparent: opacity < 1,
  });

  var ln2 = new Line2(geometry, goodMaterial);

  return ln2;
};

export type helperLineProps = {
  start: Vector3;
  end: Vector3;
  color: string;
  thickness: number;
};

export const createBatchLineGeometry = (lines: helperLineProps[]): Line2 => {
  const positions: number[] = [];
  const colors: number[] = [];
  const thicknesses: number[] = [];

  lines.forEach(({ start, end, color, thickness }) => {
    positions.push(start.x, start.y, start.z, end.x, end.y, end.z);

    // Convert color to a Color object and push RGB values
    const colorObj = new Color(color);
    colors.push(
      colorObj.r,
      colorObj.g,
      colorObj.b,
      colorObj.r,
      colorObj.g,
      colorObj.b
    );

    // Push thickness value for both vertices of the line
    thicknesses.push(thickness, thickness);
  });

  const geometry = new LineGeometry();
  geometry.setPositions(positions);
  geometry.setColors(colors);
  geometry.setAttribute(
    "thickness",
    new Float32BufferAttribute(thicknesses, 2)
  );

  const lineMaterial = new LineMaterial({
    color: 0xffffff,
    vertexColors: true,
    linewidth: 3,
    alphaToCoverage: true,
  });

  const batchLine = new Line2(geometry, lineMaterial);

  batchLine.geometry.setAttribute(
    "linewidth",
    new Float32BufferAttribute(thicknesses, 2)
  );
  //batchLine.computeLineDistances();
  return batchLine;
};
