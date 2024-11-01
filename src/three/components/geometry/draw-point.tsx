import { Point, Points } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

import { useThree } from "@react-three/fiber";
import { useGeometry } from "../../../context";
import { useDrawPoint } from "../../hooks/useDrawPoint";

const DrawPoint = () => {
  const { addObject } = useGeometry();

  const { camera, size } = useThree();

  const ptRef = useRef<any>(null);

  const position = useDrawPoint(camera, size);

  useEffect(() => {
    setTimeout(() => {
      if (ptRef.current) {
        addObject(ptRef.current);
      }
    }, 10);
  }, [position]);

  return (
    <>
      {position && (
        <Points ref={ptRef}>
          <pointsMaterial vertexColors color="red" size={1} />
          <Point position={position} />
        </Points>
      )}
    </>
  );
};

export default DrawPoint;
