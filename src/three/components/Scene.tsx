import { OrbitControls, OrthographicCamera } from "@react-three/drei";
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
    >
      <OrthographicCamera makeDefault position={[0, 3, 2.5]} zoom={100} />
      {/* <OrbitControls enabled={false} /> */}
      <axesHelper />

      {children}
    </Canvas>
  );
};

export default Scene;
