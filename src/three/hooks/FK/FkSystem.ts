import { Line3, Scene, Vector3 } from "three";

import {
  createLine as polar2dLine,
  toThickLineGeometry,
} from "../../helpers/line-helper";
import { Line2 } from "three/examples/jsm/Addons.js";
import { getPolarCoordinate, remap } from "../../../kernel/core";
import { getRandomWarmColor } from "../../utils";

export interface FkSystemProps {
  linksProps: FKLinkProps[];
}

export interface FKLinkProps {
  start: Vector3;
  childrenCount: number;
  childrenLengths: number[];
  thicknesses: number[];
  colors: string[];
  ts: number[];
}

export class FkSystem {
  links: FkLink[] = [];

  constructor(sysProps: FkSystemProps) {
    for (let i = 0; i < sysProps.linksProps.length; i++) {
      const linkProps = sysProps.linksProps[i];

      const link = new FkLink(
        linkProps.start,
        linkProps.childrenLengths[0],
        0,
        linkProps.thicknesses[0],
        linkProps.colors[0],
        linkProps.ts[0]
      );

      for (let j = 1; j < linkProps.childrenCount!; j++) {
        link.addChild(
          linkProps.childrenLengths[j],
          0,
          linkProps.thicknesses[j],
          linkProps.colors[j],
          linkProps.ts[j]
        );
      }

      this.links.push(link);
    }
  }

  wiggleSystem = (scene: Scene) => {
    this.links.forEach((link) => {
      link.wiggle();
      link.childeren.forEach((child) => child.wiggle());
      link.runSimulation(scene);
    });
  };

  static createDefault = () => {
    const fkLinkProps: FKLinkProps[] = [
      {
        start: new Vector3(0, 0, 1),
        childrenCount: 3,
        childrenLengths: [0.5, 0.5, 0.5],
        thicknesses: [3, 3, 3],
        colors: [
          getRandomWarmColor(),
          getRandomWarmColor(),
          getRandomWarmColor(),
        ],
        ts: [
          Math.random() * 3 - 1,
          Math.random() * 3 - 1,
          Math.random() * 3 - 1,
        ],
      },
      {
        start: new Vector3(0, 0, 0.5),
        childrenCount: 5,
        childrenLengths: [0.3, 0.3, 0.3, 0.3, 0.3],
        thicknesses: [3, 3, 3, 3, 3],
        colors: [
          getRandomWarmColor(),
          getRandomWarmColor(),
          getRandomWarmColor(),
          getRandomWarmColor(),
          getRandomWarmColor(),
        ],
        ts: [
          Math.random() * 4 - 2,
          Math.random() * 3 - 2,
          Math.random() * 3 - 2,
          Math.random() * 3 - 2,
          Math.random() * 3 - 2,
        ],
      },
    ];

    const sysLinkProp: FkSystemProps = {
      linksProps: fkLinkProps,
    };
    const sys = new FkSystem(sysLinkProp);

    return sys;
  };
}

export class FkLink {
  seg: Line3;
  angle: number;
  selfAngle: number;
  length: number;
  childeren: FkLink[] = [];
  thickness: number;
  color: string;
  renderLine: Line2;
  t: number;
  private runSimulationCalled: boolean = false;
  /**
   *
   */
  constructor(
    startPt: Vector3,
    len: number,
    angle: number,
    thickness: number = 5,
    color: string = "white",
    t = 0
  ) {
    this.runSimulationCalled = false;
    this.length = len;
    this.angle = angle;
    this.selfAngle = angle;
    this.thickness = thickness;
    this.color = color;
    this.t = t;
    this.seg = polar2dLine(startPt.x, startPt.y, len, angle);
    this.seg.start.z = startPt.z;
    this.seg.end.z = startPt.z;

    this.renderLine = toThickLineGeometry(this.seg, this.color, this.thickness);
  }

  addChild = (
    len: number,
    angle: number,
    thickness: number = 5,
    color: string = "white",
    t = 0
  ) => {
    //check if this start of this link is end of the last link

    const lastLinkEnd =
      this.childeren.length === 0
        ? this.seg.end
        : this.childeren[this.childeren.length - 1].seg.end;

    const fkLink = new FkLink(lastLinkEnd, len, angle, thickness, color, t);

    this.childeren.push(fkLink);
  };

  getAllRenderedLinks = (): Line2[] => {
    const lns = [];
    lns.push(this.renderLine);

    this.childeren.forEach((link) => lns.push(link.renderLine));

    return lns;
  };

  wiggle = () => {
    const sin = Math.sin(this.t);
    const wiggleAmount = remap(sin, -1, 1, -0.001, 0.001);

    this.seg.start.x += wiggleAmount;
    this.seg.start.z += wiggleAmount;

    this.selfAngle = remap(sin, -1, 1, 0.1, -0.1);
    this.t += 0.03;
  };

  runSimulation = (scene: Scene, rotationAgnle: number = Math.PI / 2) => {
    if (!this.runSimulationCalled) {
      scene.add(this.renderLine);

      this.childeren.forEach((link) => scene.add(link.renderLine));

      this.runSimulationCalled = true;
    }

    this.angle = this.selfAngle;
    this.angle += rotationAgnle;
    this.childeren.forEach((child, index) => {
      child.angle = child.selfAngle;
      if (index === 0) {
        child.angle += this.angle;
      } else {
        child.angle += this.childeren[index - 1].angle;
      }
    });

    this.updateLink();
  };

  private updateLink = () => {
    const { dX, dY } = getPolarCoordinate(
      this.seg.start.x,
      this.seg.start.y,
      this.length,
      this.angle
    );
    this.seg.end.x = dX;
    this.seg.end.y = dY;

    console.log;

    //this.renderLine.geometry.setFromPoints([this.seg.start, this.seg.end]);
    const positions = [
      this.seg.start.x,
      this.seg.start.y,
      this.seg.start.z,
      this.seg.end.x,
      this.seg.end.y,
      this.seg.end.z,
    ];
    this.renderLine.geometry.setPositions(positions);

    this.childeren.forEach((link, index) => {
      if (index == 0) {
        //take from main
        link.seg.start.copy(this.seg.end);
      } else {
        const prevLink = this.childeren[index - 1];

        link.seg.start.copy(prevLink.seg.end);
      }

      const { dX, dY } = getPolarCoordinate(
        link.seg.start.x,
        link.seg.start.y,
        link.length,
        link.angle
      );

      link.seg.end.copy(new Vector3(dX, dY, link.seg.end.z));

      const positions = [
        link.seg.start.x,
        link.seg.start.y,
        link.seg.start.z,
        link.seg.end.x,
        link.seg.end.y,
        link.seg.end.z,
      ];
      link.renderLine.geometry.setPositions(positions);
    });
  };
}
