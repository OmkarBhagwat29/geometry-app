import React, { useState } from "react";
import LightsSetup from "./light-setup";
import { OrbitControls, Plane } from "@react-three/drei";
import Animation from "./animation/animation";

import { toRadians } from "../../../../kernel/core";
import { MeshStandardMaterial } from "three";

const SceneSetup = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <>
      {!isAnimating && (
        <OrbitControls
          target={[0, 1800, 0]}
          enablePan={false}
          rotateSpeed={2}
          minPolarAngle={toRadians(0)}
          maxPolarAngle={toRadians(100)}
        />
      )}
      <LightsSetup />
      <Plane
        material={new MeshStandardMaterial({ color: "pink" })}
        args={[5000, 5000]}
        rotation-x={toRadians(-90)}
        receiveShadow={true}
      />
      <Animation setIsAnimating={setIsAnimating} />
    </>
  );
};

export default SceneSetup;
