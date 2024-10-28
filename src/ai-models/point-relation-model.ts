import { relativePosition } from "../kernel/core";

export interface pointRelationModel {
  sampleCount: number;
  minRange: number;
  maxRange: number;
}

export interface MinAndMax {
  minOriginX: number;
  maxOriginX: number;
  minOriginY: number;
  maxOriginY: number;

  minEndX: number;
  maxEndX: number;
  minEndY: number;
  maxEndY: number;

  minDirX: number;
  maxDirX: number;
  minDirY: number;
  maxDirY: number;

  minTestPtX: number;
  maxTestPtX: number;
  minTestPtY: number;
  maxTestPtY: number;

  minArea: number;
  maxArea: number;
  // minDistance: number;
  // maxDistance: number;
}

export interface LabelData {
  origin_x: number;
  origin_y: number;
  end_x: number;
  end_y: number;
  dir_x: number;
  dir_y: number;
  testPt_x: number;
  testPt_y: number;
  area: number;
  relation?: relativePosition;
}
