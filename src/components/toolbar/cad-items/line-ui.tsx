import React from "react";
import TooltipWrapper from "../tooltip-wrapper";
import { useGeometry } from "../../../context/GeometryContext";

const LineUI = () => {
  const { runCommand } = useGeometry();

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    runCommand("line");
  };

  return (
    <TooltipWrapper message="line" onClick={handleOnClick}>
      <img src="./icons/line.png" alt="line" />
    </TooltipWrapper>
  );
};

export default LineUI;
