import { useThree } from "@react-three/fiber";
import React from "react";
import {
  CameraPositionAndRotaionProps,
  InterpolateCamera,
} from "./scroll-interpolate";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const step_1_start: CameraPositionAndRotaionProps = {
  position: {
    x: -1055.0,
    y: 4000.0,
    z: -194.2,
  },
  rotation: {
    x: -1.4464413322481353,
    y: 0,
    z: 0,
  },
};

const step_1_end: CameraPositionAndRotaionProps = {
  position: {
    x: 1240.132289830195,
    y: 4000.0,
    z: -194.2,
  },
  rotation: {
    x: -1.4464413322481353,
    y: 0,
    z: 0,
  },
};

const step_2_end: CameraPositionAndRotaionProps = {
  position: {
    x: 1500,
    y: 3143,
    z: 1130,
  },
  rotation: {
    x: 0,
    y: 0.64,
    z: 0,
  },
};

const step_3_end: CameraPositionAndRotaionProps = {
  position: {
    x: 0,
    y: 1800,
    z: 5500,
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0,
  },
};

const Animation = ({ setIsAnimating }) => {
  const { camera, size, gl } = useThree();

  let lastScrollY = 0;

  const onScroll = () => {
    const scrollY = window.scrollY;

    const scrollReach = scrollY / size.height;

    const deltaScroll = scrollY - lastScrollY;

    if (scrollReach < 1) {
      const moveX = camera.position.x + (deltaScroll / size.height) * 1150;

      camera.position.x = moveX;

      setIsAnimating(true);
    } else if (scrollReach >= 1 && scrollReach < 2) {
      InterpolateCamera({
        camera,
        animationStep: 1,
        scrollReach,
        deltaScroll,
        viewportHeight: size.height,
        start: step_1_end,
        end: step_2_end,
      });
      setIsAnimating(true);
    } else if (scrollReach >= 2 && scrollReach < 3) {
      InterpolateCamera({
        camera,
        animationStep: 2,
        scrollReach,
        deltaScroll,
        viewportHeight: size.height,
        start: step_2_end,
        end: step_3_end,
      });
      setIsAnimating(true);
      //animation ended
    } else {
      setIsAnimating(false);
    }

    lastScrollY = scrollY;
  };

  window.addEventListener("scroll", onScroll);

  return <></>;
};

export default Animation;
