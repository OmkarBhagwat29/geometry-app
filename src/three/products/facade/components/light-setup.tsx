import React, { useEffect, useRef, useState } from "react";
import {
  DirectionalLight,
  Object3D,
  SpotLight
} from "three";
import { useControls } from "leva";
import { useHelper } from "@react-three/drei";

const LightsSetup = () => {
  const { dirIntensity } = useControls("Directional Light", {
    dirIntensity: { value: 1, min: 0, max: 20, step: 0.1 },
  });

  const { spotIntensity } = useControls("Directional Light", {
    spotIntensity: { value: 10, min: 0, max: 500, step: 0.1 },
  });

  const dirLightRef = useRef<DirectionalLight | null>(null);

  const spotLightRef = useRef<SpotLight | null>(null);

  // useHelper(
  //   spotLightRef as React.MutableRefObject<Object3D>,
  //   SpotLightHelper,
  //   "black"
  // );

  // useHelper(
  //   dirLightRef as React.MutableRefObject<Object3D>,
  //   DirectionalLightHelper
  // );

  const [isReady, setIsReady] = useState(false);

  const target = new Object3D();
  target.position.set(0, 1500, 0);
  useEffect(() => {
    if (dirLightRef.current && spotLightRef.current) {
      const shadowCamera = dirLightRef.current.shadow.camera;
      shadowCamera.near = 1000; // Set your desired near value
      shadowCamera.far = 6000; // Set your desired far value
      shadowCamera.left = -2000;
      shadowCamera.right = 2000;
      shadowCamera.top = 3000;
      shadowCamera.bottom = -1000;

      setIsReady(true);
    }
  }, []);

  return (
    <>
      <ambientLight intensity={1} />

      {/* <directionalLight
        ref={dirLightRef}
        intensity={dirIntensity}
        position={[1500, 4500, 1000]}
        castShadow={false}
        shadow-mapSize-height={1024 / 1}
        shadow-mapSize-width={1024 / 1}
      /> */}

      <spotLight
        color={"white"}
        ref={spotLightRef}
        intensity={spotIntensity}
        position={[0, 5000, 1000]}
        target={target}
        decay={0}
      />

      {dirLightRef.current && isReady && (
        <cameraHelper
          args={[dirLightRef.current.shadow.camera]}
          visible={false}
        />
      )}

      {spotLightRef.current && isReady && (
        <cameraHelper
          args={[spotLightRef.current.shadow.camera]}
          visible={false}
        />
      )}
    </>
  );
};

export default LightsSetup;
