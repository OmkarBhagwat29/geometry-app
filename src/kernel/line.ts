import { dotProduct, Vector } from "./vector";

export class KLine {
  start_point: Vector;
  end_point: Vector;
  dir: Vector;
  length: number;

  constructor(p1: Vector, p2: Vector) {
    this.dir = p2.subtract(p1);
    this.length = this.dir.magnitude();
    this.dir.normalize();

    this.start_point = p1;
    this.end_point = p2;
  }

  evaluate(t: number): Vector {
    const point = this.end_point
      .subtract(this.start_point)
      .multiply(t)
      .add(this.start_point);

    return point;
  }

  angleBetween(line: KLine): number {
    const curMag = this.dir.magnitude();
    const lineMag = line.dir.magnitude();
    const dot = dotProduct(this.dir, line.dir);

    console.log("dot", dot);
    const denom = Math.abs(dot) / (curMag * lineMag);

    const angle = (Math.acos(denom) * 180) / Math.PI;

    return angle;
  }

  distanceTo(point: Vector): number {
    const startToPt = point.subtract(this.start_point);
    const lnDir = this.end_point.subtract(this.start_point);
    const t = dotProduct(lnDir, startToPt) / lnDir.magnitudeSquare();

    const tPt = lnDir.multiply(t).add(this.start_point);

    if (t < 0) {
      return Math.sqrt(tPt.squareDistanceTo(this.start_point));
    } else if (t > 1) {
      return Math.sqrt(tPt.squareDistanceTo(this.end_point));
    }

    const dist_vec = tPt.subtract(point);

    return dist_vec.magnitude();
  }
}
