import React from "react";
import TooltipWrapper from "../tooltip-wrapper";
import { useGeometry } from "../../../context/GeometryContext";

const PointUI = () => {
  const { runCommand } = useGeometry();

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    //dispatch({ type: "DRAW", payload: { geomType: "POINT" } });
    runCommand("point");
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <TooltipWrapper
      message="point"
      onClick={handleOnClick}
      onRightClick={handleRightClick}
    >
      <img src="./icons/point.png" alt="point" />
    </TooltipWrapper>
  );
};

export default PointUI;
