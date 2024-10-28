import React from "react";
import TooltipWrapper from "../tooltip-wrapper";
import { useAppContext } from "../../../core/app-context";

const PolylineUI = () => {
  const [, dispatch] = useAppContext();

  const handleOnClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    dispatch({ type: "DRAW", payload: { geomType: "POLYLINE" } });
  };

  return (
    <TooltipWrapper message="polyline" onClick={handleOnClick}>
      <img src="./icons/polyline.png" alt="polyline" />
    </TooltipWrapper>
  );
};

export default PolylineUI;
