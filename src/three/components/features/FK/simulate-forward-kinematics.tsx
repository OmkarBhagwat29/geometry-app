import React, { useEffect } from "react";
import { useGeometry } from "../../../../context/GeometryContext";
import { useFK } from "../../../hooks/FK/useFK";

const SimForwardKinematics = () => {
  const { addObjects } = useGeometry();

  const links = useFK();

  useEffect(() => {
    if (links) {
      addObjects(links);
    }
  }, [links]);

  return (
    <>
      {links &&
        links.map((link, index) => <primitive key={index} object={link} />)}
    </>
  );
};

export default SimForwardKinematics;
