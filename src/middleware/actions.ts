import { pointRelationModel } from "../ai-models/point-relation-model";
import { SnapOption } from "../components/toolbar/snap-options";

export type DrawType = "POINT" | "LINE" | "POLYLINE" | 'CIRCLE';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Action =
  | { type: "LOGIN"; payload: { token: string } }
  | { type: "LOGOUT" }
  | {
      type: "START_THREE";
      payload: { canvas: HTMLCanvasElement };
    }
  | {
      type: "SNAP_OPTIONS";
      payload: { options: { type: SnapOption; isActive: boolean }[] };
    }
  | { type: "DRAW"; payload: { geomType: DrawType; isRecursive?: boolean } }
  | {
      type: "GENERATE_POINT_LINE_REL_DATASET";
      payload: { model: pointRelationModel };
    }
  | {
      type: "FIND_POINT_REALTION_TO_LINE";
    }
  | { type: "TEST" }
  | { type: "END_THREE" };
