import React, { MouseEvent } from "react";
import TooltipWrapper from "../tooltip-wrapper";

const CircleUI = () => {

  const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <TooltipWrapper message="circle" onClick={handleOnClick}>
        <img src="./icons/circle.png" alt="line" />
      </TooltipWrapper>
    </>
  );
};

export default CircleUI;
