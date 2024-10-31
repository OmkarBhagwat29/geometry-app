import React from "react";
import { useCADItems } from "../../../context";
import DrawLine from "./draw-Line";
import DrawPoint from "./draw-point";

const GeometryWrapper = () => {
  const { command } = useCADItems();
  return (
    <>
      {command === "line" && <DrawLine />}

      {command === "point" && <DrawPoint />}
    </>
  );
};

export default GeometryWrapper;
