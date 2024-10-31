import React, { useEffect, useRef } from "react";

import { Line } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { useCADItems } from "../../../context";
import { useDrawLine } from "../../hooks/useDrawLine";

const DrawLine = () => {
  const { addObject } = useCADItems();

  const { scene, camera, size } = useThree();

  const lnRef = useRef<any>();

  const line = useDrawLine(scene, camera, size);

  useEffect(() => {
    if (lnRef.current) {
      addObject(lnRef.current);
    }
  }, [line]);

  return (
    <>
      {line && (
        <Line ref={lnRef} points={[line.start, line.end]} lineWidth={3} />
      )}
    </>
  );
};

export default DrawLine;
