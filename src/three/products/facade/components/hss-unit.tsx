import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect } from "react";

import { ModelProvider } from "../../../components/model-provider";
import SceneSetup from "./scene-setup";
import { PerspectiveCamera } from "three";
import LoadUnitModel from "./load-unit-model";
import PartsManager from "./parts-manager";
import { Perf } from "r3f-perf";

const ResizeHandler = () => {
  const { camera } = useThree();

  useEffect(() => {
    const handleResize = () => {
      console.log("resizing");
      if (camera instanceof PerspectiveCamera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [camera]);

  return null;
};

const HSSUnit = () => {
  return (
    <ModelProvider>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          outline: "none",
          zIndex: 1,
        }}
        shadows={"soft"}
        gl={{ alpha: true }}
        camera={{
          fov: 50,
          aspect: window.innerWidth / window.innerHeight,
          near: 10,
          far: 50000,
          position: [-1055.0, 4000.0, -194.2],
          rotation: [-1.4464413322481353, 0, 0],
          zoom: 1,
        }}
      >
        <Perf position="top-left" />
        <ResizeHandler />

        <Suspense>
          <LoadUnitModel />
          <PartsManager />
          <SceneSetup />
        </Suspense>
      </Canvas>
    </ModelProvider>
  );
};

export default HSSUnit;
