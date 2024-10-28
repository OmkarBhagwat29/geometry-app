export const tolerance = 1e-4;

export const ZERO = 0.0;

export const isEqual = (x: number, y: number) => {
  return Math.abs(x - y) < tolerance;
};

export enum relativePosition {
  left = "left",
  right = "right",
  between = "on line",
  behind = "behind",
  beyond = "beyond",
  origin = "origin",
  destination = "end",
}

export const xOr = (x: boolean, y: boolean) => {
  return x === y ? false : true;
};

export const toDegrees = (angleInRadians: number) => {
  return (angleInRadians * 180.0) / Math.PI;
};

export const toRadians = (angleInRadians: number) => {
  return (angleInRadians * Math.PI) / 180.0;
};

// Helper function to normalize individual values based on min and max
export const normalizeValue = (
  value: number,
  min: number,
  max: number
): number => {
  return (value - min) / (max - min);
};

/**
 * Remaps a number from one range to another.
 *
 * @param value - The value to remap.
 * @param fromMin - The lower bound of the initial range.
 * @param fromMax - The upper bound of the initial range.
 * @param toMin - The lower bound of the target range.
 * @param toMax - The upper bound of the target range.
 * @returns The remapped value.
 */
export const remap = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number => {
  return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
};
