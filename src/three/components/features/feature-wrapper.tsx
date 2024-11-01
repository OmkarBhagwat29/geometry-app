import React from "react";
import { useFeature } from "../../../context";
import SimForwardKinematics from "./FK/simulate-forward-kinematics";
import SimInverseKinematics from "./FK/sim-inverse-kinematics";
import { ModelProvider } from "../model-provider";
import ModelLoader from "../model-loader";
import { Rhino3dmLoader } from "three/examples/jsm/Addons.js";

const FeatureWrapper = () => {
  const { feature } = useFeature();

  return (
    <>
      {feature === "FK" && <SimForwardKinematics />}
      {feature === "IK" && (
        <ModelProvider>
          <ModelLoader pathUrl="./rhino/diwali.3dm" loader={Rhino3dmLoader} />
          <SimInverseKinematics />
        </ModelProvider>
      )}
    </>
  );
};

export default FeatureWrapper;
