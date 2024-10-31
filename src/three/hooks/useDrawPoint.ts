import { Size } from "@react-three/fiber";
import { GetMouseCoordinates, GetViewportCoordinates } from "../utils";
import { Camera, Vector3 } from "three";
import { useEffect, useState } from "react";
import { getPointOnMouseEvent } from "./moseEventHelpers";

export const useDrawPoint = (camera: Camera, size: Size) => {
  const [point, setPoint] = useState<Vector3 | null>(null);

  useEffect(() => {
    const clickPoint = (e: MouseEvent) => {
      const pt = getPointOnMouseEvent(e, camera, size);

      setPoint(pt);

      window.removeEventListener("click", clickPoint); // Clean up on event trigger
    };

    window.addEventListener("click", clickPoint);

    return () => {
      window.removeEventListener("click", clickPoint);
    };
  }, []);

  return point;
};
