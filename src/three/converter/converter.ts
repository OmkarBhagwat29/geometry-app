import * as th from "three";

export const toLines = (obj: th.Line): th.Line3[] => {
  const geom = obj.geometry as th.BufferGeometry;
  const pos = geom.attributes.position.array;

  const lns = [];

  //it is a line
  for (let i = 0; i < pos.length - 3; i += 3) {
    const start = new th.Vector3(pos[i], pos[i + 1], pos[i + 2]);
    const end = new th.Vector3(pos[i + 3], pos[i + 4], pos[i + 5]);

    // Apply the world matrix to get the transformed position
    const startWorld = start.applyMatrix4(obj.matrixWorld);
    const endWorld = end.applyMatrix4(obj.matrixWorld);

    const ln3 = new th.Line3(startWorld, endWorld);

    lns.push(ln3);
  }

  return lns;
};

export const toPoint = (ptObj: th.Points): th.Vector3 => {
  const geom = ptObj.geometry as th.BufferGeometry;
  const pos = geom.attributes.position.array;

  return new th.Vector3(pos[0], pos[1], pos[2]);
};
