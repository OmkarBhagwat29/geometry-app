import React from "react";
import TooltipWrapper from "../tooltip-wrapper";
import { useFeature } from "../../../context";

const Fk = () => {
  const { runFeature } = useFeature();
  return (
    <TooltipWrapper
      message="Forward Kinematics"
      onClick={() => runFeature("FK")}
    >
      <img src="./icons/fk.png" />
    </TooltipWrapper>
  );
};

export default Fk;
