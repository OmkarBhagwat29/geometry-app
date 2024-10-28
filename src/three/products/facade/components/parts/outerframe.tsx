import React, { useEffect, useMemo, useState } from "react";

import {
  Color,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  Object3D,
} from "three";
import { ModelManager } from "../../model_manager";

import { useModel } from "../../../../components/use-model";

const Outerframe = () => {
  const { model } = useModel();

  const [outerframes, setOuterframes] = useState<Object3D[]>([]);

  const frameMaterial = useMemo(
    () =>
      new MeshPhongMaterial({
        color: 0x1f1f1f, // Dark gray color for steel
        shininess: 100,
        specular: new Color("gray"), // 0x1188ff Moderate roughness for a slightly brushed look
        reflectivity: 0.7, // Reflective quality of steel // Subtle clear coat for additional gloss and depth
      }),
    []
  );

  useEffect(() => {
    if (!model) return;

    const frames = ModelManager.getObjectsByNames(model, ["outerFrame"]);

    setOuterframes(frames);
  }, [model]);

  return (
    <>
      {outerframes.map((frame, index) => (
        <primitive key={index} object={frame} material={frameMaterial} />
      ))}
    </>
  );
};

export default Outerframe;
