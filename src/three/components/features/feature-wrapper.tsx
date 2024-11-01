import React from "react";
import { useFeature } from "../../../context";
import SimForwardKinematics from "./FK/simulate-forward-kinematics";
import SimInverseKinematics from "./FK/sim-inverse-kinematics";

const FeatureWrapper = () => {
  const { feature } = useFeature();

  return (
    <>
      {feature === "FK" && <SimForwardKinematics />}
      {feature === "IK" && <SimInverseKinematics />}
    </>
  );
};

export default FeatureWrapper;
