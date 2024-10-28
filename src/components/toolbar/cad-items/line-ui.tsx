import React from "react";
import TooltipWrapper from "../tooltip-wrapper";
import { useAppContext } from "../../../core/app-context";

const LineUI = () => {
  const [, dispatch] = useAppContext();

  const handleOnClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    dispatch({ type: "DRAW", payload: { geomType: "LINE" } });
  };

  return (
    <TooltipWrapper message="line" onClick={handleOnClick}>
      <img src="./icons/line.png" alt="line" />
    </TooltipWrapper>
  );
};

export default LineUI;
