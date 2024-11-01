import { Vector3 } from "three";

export const insertIntermediatePoints = (
  points: Vector3[],
  threshold: number
) => {
  const adjustedPoints = [];

  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];

    adjustedPoints.push(start.clone()); // Always add the start point

    const distance = start.distanceTo(end);

    // If distance is greater than threshold, add intermediate points
    if (distance > threshold) {
      const segmentCount = Math.ceil(distance / threshold);
      for (let j = 1; j < segmentCount; j++) {
        const t = j / segmentCount;
        const intermediatePoint = new Vector3().lerpVectors(start, end, t);
        adjustedPoints.push(intermediatePoint);
      }
    }
    if (distance >= threshold) {
      adjustedPoints.push(end.clone());
    }
  }

  // Add the last point
  adjustedPoints.push(points[points.length - 1].clone());

  return adjustedPoints;
};
