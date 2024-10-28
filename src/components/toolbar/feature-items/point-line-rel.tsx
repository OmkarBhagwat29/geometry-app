import React from "react";
import TooltipWrapper from "../tooltip-wrapper";
import { useAppContext } from "../../../core/app-context";

const PointLineRel = () => {
  const [, dispatch] = useAppContext();
  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatch({ type: "FIND_POINT_REALTION_TO_LINE" });
  };

  return (
    <TooltipWrapper
      message="find point relation to line"
      onClick={handleOnClick}
    >
      <img src="./icons/pointLineRel.png" />
    </TooltipWrapper>
  );
};

export default PointLineRel;
