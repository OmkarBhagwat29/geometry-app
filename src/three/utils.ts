import * as th from "three";
import { Constant } from "./constants";


const intersectionPoint = new th.Vector3();
//const planeNormal = new THREE.Vector3();
//const plane = new THREE.Plane();

const rayCaster = new th.Raycaster();

export const GetViewportCoordinates = (
  camera: th.Camera,
  mouse: th.Vector2
): th.Vector3 => {
  //planeNormal.copy(camera.position).normalize();
  // plane.setFromNormalAndCoplanarPoint(planeNormal, new THREE.Vector3(0, 0, 0));

  rayCaster.setFromCamera(mouse, camera);

  rayCaster.ray.intersectPlane(Constant.cPlane, intersectionPoint);

  return intersectionPoint;
};

export const GetMouseCoordinates = (
  clientX: number,
  clientY: number,
  canvasWidth: number,
  canvasHeight: number
): th.Vector2 => {
  const x = (clientX / canvasWidth) * 2 - 1;
  const y = -(clientY / canvasHeight) * 2 + 1;

  return new th.Vector2(x, y);
};

export const getCentroid = (obj: th.Object3D): th.Vector3 | null => {
  let geom: th.BufferGeometry;
  if (
    obj instanceof th.Mesh ||
    obj instanceof th.Points ||
    obj instanceof th.Line
  ) {
    geom = obj.geometry;
  } else {
    return null;
  }

  geom.computeBoundingBox();

  // Get the bounding box and calculate the center
  const boundingBox = geom.boundingBox;
  if (boundingBox) {
    const centroid = boundingBox.getCenter(new th.Vector3());

    // Apply the object's world matrix to the centroid for proper world positioning
    obj.updateMatrixWorld(true);
    centroid.applyMatrix4(obj.matrixWorld);

    return centroid;
  }

  return null;
};
