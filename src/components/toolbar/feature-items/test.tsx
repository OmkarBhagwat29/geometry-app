import React from "react";

import { useAppContext } from "../../../core/app-context";
import TooltipWrapper from "../tooltip-wrapper";

const Test = () => {
  const [, dispatch] = useAppContext();
  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatch({ type: "TEST" });
  };
  return (
    <TooltipWrapper
      message="find point relation to line"
      onClick={handleOnClick}
    >
      <img src="./icons/test.png" />
    </TooltipWrapper>
  );
};

export default Test;
