import * as th from "three";

export const onSceneObjectClick = (
  mouse: th.Vector2,
  camera: th.Camera,
  objects: th.Object3D[]
): th.Object3D | null => {
  const raycaster = new th.Raycaster();

  raycaster.setFromCamera(mouse, camera);

  raycaster.params.Line.threshold = 0.1;
  raycaster.params.Points.threshold = 0.5;

  const intersects = raycaster.intersectObjects(objects, false);

  if (intersects.length > 0) return intersects[0].object;
  else return null;
};
