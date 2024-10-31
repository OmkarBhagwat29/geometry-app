import React from "react";
import TooltipWrapper from "../tooltip-wrapper";
import { useAppContext } from "../../../core/app-context";
import { useGeometry } from "../../../context/GeometryContext";

const PointUI = () => {
  // const [, dispatch] = useAppContext();

  const { runCommand } = useGeometry();

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    //dispatch({ type: "DRAW", payload: { geomType: "POINT" } });
    runCommand("point");
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    // dispatch({
    //   type: "DRAW",
    //   payload: { geomType: "POINT", isRecursive: true },
    // });
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
