import { Camera } from "three";

export interface CameraPositionAndRotaionProps {
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
}

export interface InterpolateCameraProps {
  camera: Camera;
  animationStep: number;
  scrollReach: number;
  deltaScroll: number;
  viewportHeight: number;
  start: CameraPositionAndRotaionProps;
  end: CameraPositionAndRotaionProps;
}

export const InterpolateCamera = ({
  camera,
  animationStep,
  scrollReach,
  deltaScroll,
  viewportHeight,
  start,
  end,
}: InterpolateCameraProps) => {
  let progress = scrollReach - animationStep + deltaScroll / viewportHeight;
  progress = Math.min(Math.max(progress, 0), 1);

  camera.position.x =
    start.position.x + (end.position.x - start.position.x) * progress;

  camera.position.y =
    start.position.y + (end.position.y - start.position.y) * progress;

  camera.position.z =
    start.position.z + (end.position.z - start.position.z) * progress;

  camera.rotation.x =
    start.rotation.x + (end.rotation.x - start.rotation.x) * progress;

  camera.rotation.y =
    start.rotation.y + (end.rotation.y - start.rotation.y) * progress;

  camera.rotation.z =
    start.rotation.z + (end.rotation.z - start.rotation.z) * progress;
};
