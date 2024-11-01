import React, { useState } from "react";
import {
  GeometryProvider,
  CADType,
  FeatureProvider,
  FeatureType,
} from "../../context";
import CadUiWrap from "./CadUiWrap";
import { Object3D } from "three";

const CADApp = () => {
  const [command, setCommand] = useState<CADType>(null);

  const [feature, setFeature] = useState<FeatureType>(null);

  const [objects, setObjects] = useState<Object3D[]>([]);

  const runCommand = (command: CADType) => {
    console.log("command sent to", command);
    setCommand(command);

    if (command) {
      //preposess
    } else {
      //post process
    }
  };

  const addObject = (obj: Object3D) => {
    setObjects((prv) => [...prv, obj]);

    setCommand(null);
    setFeature(null);
  };

  const addObjects = (objs: Object3D[]) => {
    setObjects((prev) => [...prev, ...objs]); // Add multiple objects

    setCommand(null);
    setFeature(null);
  };

  const runFeature = (feature: FeatureType) => {
    setFeature(feature);
  };

  return (
    <GeometryProvider
      value={{ objects, addObject, addObjects, command, runCommand }}
    >
      <FeatureProvider value={{ feature, runFeature }}>
        <CadUiWrap />
      </FeatureProvider>
    </GeometryProvider>
  );
};

export default CADApp;
