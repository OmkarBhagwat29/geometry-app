import { isEqual, relativePosition, tolerance, ZERO } from "./core";

import { crossProduct2D, Vector } from "./vector";

export const areaTriangle2d = (a: Vector, b: Vector, c: Vector): number => {
  const ab = b.subtract(a);
  const ac = c.subtract(a);

  const crossPoduct = crossProduct2D(ab, ac);

  let area = crossPoduct / 2.0;
  if (area > 0 && area < tolerance) {
    area = 0;
  }

  if (area < 0 && area > tolerance) {
    area = 0;
  }
  return area;
};

export const orientation2d = (
  a: Vector,
  b: Vector,
  c: Vector
): relativePosition => {
  const area = areaTriangle2d(a, b, c);

  if (isEqual(area, ZERO) === false && area > 0) {
    return relativePosition.left;
  }

  if (isEqual(area, ZERO) === false && area < 0) {
    return relativePosition.right;
  }

  const abV = b.subtract(a);
  const acV = c.subtract(a);

  if (abV.get_x() * acV.get_x() < 0 || abV.get_y() * acV.get_y() < 0) {
    return relativePosition.behind;
  }

  if (abV.magnitude() < acV.magnitude()) {
    return relativePosition.beyond;
  }

  if (a.equals(c)) {
    return relativePosition.origin;
  }

  if (b.equals(c)) return relativePosition.destination;

  return relativePosition.between;
};

export const Collinear = (a: Vector, b: Vector, c?: Vector): boolean => {
  let v1, v2, v3;
  if (c) {
    const ab = b.subtract(a);
    const ac = c.subtract(a);

    v1 = ab.get_x() * ac.get_y() - ab.get_y() * ac.get_x();
    v2 = ab.get_y() * ac.get_z() - ab.get_z() * ac.get_y();
    v3 = ab.get_x() * ac.get_z() - ab.get_z() * ac.get_x();
  } else {
    v1 = a.get_x() * b.get_y() - a.get_y() * b.get_x();
    v2 = a.get_y() * b.get_z() - a.get_z() * b.get_y();
    v3 = a.get_x() * b.get_z() - a.get_z() * b.get_x();
  }

  if (isEqual(v1, ZERO) && isEqual(v2, ZERO) && isEqual(v3, ZERO)) {
    return true;
  }

  return false;
};
