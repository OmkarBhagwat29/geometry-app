import { Line3, Scene, Vector3 } from "three";
import { toThickLineGeometry } from "../../helpers/line-helper";
import { Line2 } from "three/examples/jsm/Addons.js";
import { getPolarCoordinate } from "../../../kernel/core";

export class IKLink {
  private updateCalled = false;
  start: Vector3;
  end: Vector3 = new Vector3();
  length: number;
  angle: number;
  thickness: number;
  color: string;
  renderLine: Line2 | null = null;
  /**
   *
   */
  constructor(
    _start: Vector3,
    _length: number,
    _angle: number,
    _thickness: number,
    _color: string
  ) {
    this.start = _start;
    this.angle = _angle;
    this.length = _length;
    this.thickness = _thickness;
    this.color = _color;

    this.calculateEnd();
  }

  private calculateEnd = () => {
    const { dX, dY } = getPolarCoordinate(
      this.start.x,
      this.start.y,
      this.length,
      this.angle
    );

    this.end.set(dX, dY, this.start.z);
  };

  update = (scene: Scene) => {
    if (!this.updateCalled) {
      this.renderLine = toThickLineGeometry(
        new Line3(this.start, this.end),
        this.color,
        this.thickness
      );
      scene.add(this.renderLine);
      this.updateCalled = true;
    } else {
      this.renderLine?.geometry.setPositions([
        this.start.x,
        this.start.y,
        this.start.z,
        this.end.x,
        this.end.y,
        this.end.z,
      ]);
    }

    this.angle += 0.01;

    this.calculateEnd();
  };
}
