import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { FC, ReactNode } from "react";

interface SceneProps {
  children: ReactNode;
}

const Scene: FC<SceneProps> = ({ children }) => {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
      camera={{ fov: 45, near: 0.5, far: 10000, position: [5, 5, 5] }}
    >
      <OrbitControls />
      <axesHelper />

      {children}
    </Canvas>
  );
};

export default Scene;
