import React, { useEffect } from "react";
import { useGeometry } from "../../../../context";
import { useIK } from "../../../hooks/IK/useIK";

const SimInverseKinematics = () => {
  const { addObjects } = useGeometry();

  const objects = useIK();

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
