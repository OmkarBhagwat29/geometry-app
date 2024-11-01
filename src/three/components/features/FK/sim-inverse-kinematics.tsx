import React, { useEffect } from "react";
import { useGeometry } from "../../../../context";
import { useIK } from "../../../hooks/IK/useIK";
import { useThree } from "@react-three/fiber";

const SimInverseKinematics = () => {
  const { addObjects } = useGeometry();
  const { scene } = useThree();

  const objects = useIK(scene);

  useEffect(() => {
    if (objects) {
      addObjects(objects);
    }
  }, [objects]);

  return (
    <>
      {objects &&
        objects.map((obj, index) => <primitive key={index} object={obj} />)}
    </>
  );
};

export default SimInverseKinematics;
