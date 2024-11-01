import React from "react";
import { useGeometry } from "../../../context";
import DrawLine from "./draw-Line";
import DrawPoint from "./draw-point";

const GeometryWrapper = () => {
  const { command } = useGeometry();
  return (
    <>
      {command === "line" && <DrawLine />}

      {command === "point" && <DrawPoint />}
    </>
  );
};

export default GeometryWrapper;
