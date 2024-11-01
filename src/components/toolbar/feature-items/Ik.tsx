import React from "react";
import TooltipWrapper from "../tooltip-wrapper";
import { useFeature } from "../../../context";

const Ik = () => {
  const { runFeature } = useFeature();
  return (
    <TooltipWrapper
      message="simulate inverse kinematics"
      onClick={() => runFeature("IK")}
    >
      <img src="./icons/ik.png" />
    </TooltipWrapper>
  );
};

export default Ik;
