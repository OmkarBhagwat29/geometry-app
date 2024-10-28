import { crossProduct3D, dotProduct, Vector } from "./vector";

export class Plane {
  private normal: Vector;
  private d: number;

  constructor(_normal: Vector, constant: number) {
    this.normal = _normal;
    this.normal.normalize();
    this.d = constant;
  }
}

export const getPlanebyThreePoints = (
  p1: Vector,
  p2: Vector,
  p3: Vector
): Plane => {
  const vA = p2.subtract(p1);
  const vB = p2.subtract(p1);

  const normal = crossProduct3D(vA, vB);
  normal.normalize();

  const d = dotProduct(normal, p1);

  return new Plane(normal, d);
};
