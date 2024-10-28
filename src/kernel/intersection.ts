import { isEqual, relativePosition, xOr, ZERO } from "./core";
import { orientation2d } from "./GeoUtils";
import { KLine } from "./line";
import { dotProduct, Vector } from "./vector";

// Overload signatures
export function lineLineIntersection2d(l1: KLine, l2: KLine): boolean;

export function lineLineIntersection2d(
  l1: KLine,
  l2: KLine,
  intersectionPoint: { point: Vector | null; t: number | null }
): boolean;

export function lineLineIntersection2d(
  l1: KLine,
  l2: KLine,
  intersectionPoint?: { point: Vector | null; t: number | null }
): boolean {
  if (!intersectionPoint) {
    return lineLineIntersection(l1, l2);
  }

  return getlineLineIntersectionPoint(l1, l2, intersectionPoint);
}

//p(t) = v.t+a
//p(t) point at param t on line
//V -> direction of a line
//t-> param
//a = known point
function getlineLineIntersectionPoint(
  l1: KLine,
  l2: KLine,
  intersectionPoint: { point: Vector | null; t: number | null }
): boolean {
  //normal vector l2
  const normal = new Vector([l2.dir.get_y(), -l2.dir.get_x()]);

  const denom = dotProduct(normal, l1.dir);

  if (!isEqual(denom, ZERO)) {
    const ac = l2.start_point.subtract(l1.start_point);

    const numer = dotProduct(normal, ac);

    const t = numer / denom;

    const x = l1.start_point.get_x() + t * l1.dir.get_x();

    const y = l1.start_point.get_y() + t * l1.dir.get_y();

    intersectionPoint.point = new Vector([x, y]);
    intersectionPoint.t = t;

    return true;
  }

  intersectionPoint.point = null;
  return false;
}

function lineLineIntersection(l1: KLine, l2: KLine): boolean {
  const ab_c = orientation2d(l1.start_point, l1.end_point, l2.start_point);
  const ab_d = orientation2d(l1.start_point, l1.end_point, l2.end_point);
  const cd_a = orientation2d(l2.start_point, l2.end_point, l1.start_point);
  const cd_b = orientation2d(l2.start_point, l2.end_point, l1.end_point);

  if (
    ab_c === relativePosition.between ||
    ab_c === relativePosition.origin ||
    ab_c === relativePosition.destination ||
    ab_d === relativePosition.between ||
    ab_d === relativePosition.origin ||
    ab_d === relativePosition.destination ||
    cd_a === relativePosition.between ||
    cd_a === relativePosition.origin ||
    cd_a === relativePosition.destination ||
    cd_b === relativePosition.between ||
    cd_b === relativePosition.origin ||
    cd_b === relativePosition.destination
  )
    return true;

  return (
    xOr(ab_c === relativePosition.left, ab_d === relativePosition.left) &&
    xOr(cd_a === relativePosition.left, cd_b === relativePosition.left)
  );
}
