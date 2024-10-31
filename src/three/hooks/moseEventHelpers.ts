import { Size } from "@react-three/fiber";
import { Camera, Vector3 } from "three";
import { GetMouseCoordinates, GetViewportCoordinates } from "../utils";

export const getPointOnMouseEvent = (
  e: MouseEvent,
  camera: Camera,
  size: Size
): Vector3 => {
  const mouse = GetMouseCoordinates(
    e.clientX,
    e.clientY,
    size.width,
    size.height
  );

  const pt = GetViewportCoordinates(camera, mouse);

  return pt;
};
