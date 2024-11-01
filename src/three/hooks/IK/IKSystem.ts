import { Line3, Scene, Vector3 } from "three";

import { Line2 } from "three/examples/jsm/Addons.js";
import {
  getPolarCoordinate as geCartesianCoordinateFromPolar,
  remap,
} from "../../../kernel/core";
import {
  createBatchLineGeometry,
  helperLineProps,
  toThickLineGeometry,
} from "../../helpers/line-helper";

export const generateIKLineProps = (arrayLength: number) => {
  return Array.from({ length: arrayLength }, (_, index) => ({
    start: new Vector3(2, 0, 0),
    length: 0.25,
    thickness: remap(index, 0, arrayLength, 20, 1), // Map thickness based on index
    color: "red",
  }));
};
export interface IKLinkProps {
  start?: Vector3;
  length: number;
  angle?: number;
  thickness: number;
  color: string;
}

export class IKSystem {
  arms: IKLink[] = [];
  // renderedLine?: Line2;
  base: Vector3 = new Vector3();

  constructor(linkProps: IKLinkProps[]) {
    const lineProps: helperLineProps[] = [];

    let { start, length, angle, thickness, color } = linkProps[0];

    if (!start) return;

    if (!angle) {
      angle = 0;
    }

    //this.base.copy(start.clone());

    const main = new IKLink(start, length, angle, thickness, color);
    this.arms.push(main);

    lineProps.push({
      start: main.start,
      end: main.end,
      color: main.color,
      thickness: main.thickness,
    });

    for (let i = 1; i < linkProps.length; i++) {
      let { length, angle, thickness, color } = linkProps[i];
      const start = this.arms[i - 1].end.clone();
      if (!angle) {
        angle = 0;
      }

      const link = new IKLink(start, length, angle, thickness, color);
      this.arms.push(link);

      lineProps.push({
        start: link.start,
        end: link.end,
        color: link.color,
        thickness: link.thickness,
      });
    }

    //this.renderedLine = createBatchLineGeometry(lineProps);
  }

  addToScene = (scene: Scene) => {
    this.arms.forEach((arm) => scene.add(arm.renderedLine));
  };

  follow = (target: Vector3) => {
    const lastLink = this.arms[this.arms.length - 1];

    lastLink.follow(target);

    for (let i = this.arms.length - 2; i >= 0; i--) {
      const next = this.arms[i + 1];
      const prev = this.arms[i];

      prev.follow(next.start);
    }
  };

  update = () => {
    //if (!this.renderedLine) return;

    //this.arms[0].fixStart(this.base);

    const positions: number[] = [];
    this.arms.forEach((arm, index) => {
      // if (index > 0) {
      //   arm.fixStart(this.arms[index - 1].end);
      // }

      positions.push(arm.start.x);
      positions.push(arm.start.y);
      positions.push(arm.start.z);
      positions.push(arm.end.x);
      positions.push(arm.end.y);
      positions.push(arm.end.z);

      arm.renderedLine.geometry.setPositions(positions);
    });
  };
}

class IKLink {
  start: Vector3;
  end: Vector3 = new Vector3();
  length: number;
  angle: number;
  thickness: number;
  color: string;
  renderedLine: Line2;

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

    this.renderedLine = toThickLineGeometry(
      new Line3(this.start, this.end),
      this.color,
      this.thickness
    );
  }

  private calculateEnd = () => {
    const { dX, dY } = geCartesianCoordinateFromPolar(
      this.start.x,
      this.start.y,
      this.length,
      this.angle
    );

    this.end.set(dX, dY, this.start.z);
  };

  fixStart = (target: Vector3) => {
    this.start.copy(target);
    this.calculateEnd();
  };

  follow = (target: Vector3) => {
    const dir = target.clone().sub(this.start);

    this.angle = Math.atan2(dir.y, dir.x);

    dir.setLength(this.length);
    dir.multiplyScalar(-1);
    this.start.copy(target.clone().add(dir));

    this.calculateEnd();
  };
}

export class IkPoint {
  target: Vector3 = new Vector3();
  draw: boolean = false;

  /**
   *
   */
  constructor(_target: Vector3, _draw: boolean) {
    this.target = _target;
    this.draw = this.draw;
  }
}
