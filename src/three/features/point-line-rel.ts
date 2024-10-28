import { Line, Object3D, Points } from "three";
import { toLines, toPoint } from "../converter/converter";
import { KLine } from "../../kernel/line";
import { Vector } from "../../kernel/vector";
import { orientation2d } from "../../kernel/GeoUtils";
import { Selection } from "../selection";

import { createHTMLFeature, disposeHTML } from "./html";

const findPointsLineRel = (lnObj: Line, ptsObj: Points[]) => {
  const ln = toLines(lnObj)[0];
  const kLn = new KLine(
    new Vector([ln.start.x, ln.start.y]),
    new Vector([ln.end.x, ln.end.y])
  );

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disposeHTML();

      window.removeEventListener("keydown", handleEsc);
    }
  };

  window.addEventListener("keydown", handleEsc);

  ptsObj.forEach((ptObj) => {
    const point = toPoint(ptObj);

    const kPt = new Vector([point.x, point.y]);

    const pos = orientation2d(kLn.start_point, kLn.end_point, kPt);

    createHTMLFeature("feature", pos.toString(), point);

    console.log(pos);
  });
};

export const runFindPointLineRel = () => {
  Selection.inCommandmode = true;

  Selection.boxSelection(["Line", "Points"], (objs: Object3D[]) => {
    console.log(objs);

    // Filter to get all Line objects
    const lines = objs.filter((o) => o instanceof Line);

    const ln = lines[0];

    // Filter to get all Points objects
    const points = objs.filter((o) => o instanceof Points);

    findPointsLineRel(ln, points);

    Selection.inCommandmode = false;
  });
};
