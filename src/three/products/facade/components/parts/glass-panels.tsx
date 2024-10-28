import React, { useEffect, useMemo, useState } from "react";
import { useModel } from "../../../../components/use-model";
import { MeshPhysicalMaterial, Object3D } from "three";
import { ModelManager } from "../../model_manager";

const GlassPanels = () => {
  const { model } = useModel();
  const [glassPanels, setGlassPanels] = useState<Object3D[]>([]);

  const glassMaterial = useMemo(() => {
    return new MeshPhysicalMaterial({
      color: 0x88ccff, // Light blue color for the glass
      transparent: true,
      opacity: 0.5, // Adjust transparency
      roughness: 0.1, // Glass is usually smooth
      metalness: 0.0, // Glass is not metallic
      ior: 1.5, // Index of refraction for glass
      clearcoat: 1.0, // Optional: adds a clear coat layer
      clearcoatRoughness: 0.1, // Optional: roughness of the clear coat
    });
  }, []);

  useEffect(() => {
    if (!model) return;

    const glassPanels = ModelManager.getObjectsByNames(model, [
      "glass_left",
      "glass_right",
    ]);

    setGlassPanels(glassPanels);
  }, [model]);

  return (
    <>
      {glassPanels.map((panel, index) => (
        <primitive key={index} object={panel} material={glassMaterial} />
      ))}
    </>
  );
};

export default GlassPanels;
