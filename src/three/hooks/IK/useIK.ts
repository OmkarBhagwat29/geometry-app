import { useEffect, useState } from "react";
import { Object3D, Vector3 } from "three";
import { IKLink } from "./IKSystem";
import { useFrame } from "@react-three/fiber";

export const useIK = () => {
  const [objects, setObjects] = useState<Object3D[] | null>(null);

  let ikLink: IKLink | null = null;

  useEffect(() => {
    ikLink = new IKLink(new Vector3(), 2, 0, 5, "pink");
  }, []);

  useFrame(({ scene }) => {
    if (!ikLink) return;

    ikLink.update(scene);
  });

  setTimeout(() => {
    if (!ikLink) return;

    if (ikLink.renderLine) {
      setObjects([ikLink.renderLine]);
    }
  }, 1000);

  return objects;
};
