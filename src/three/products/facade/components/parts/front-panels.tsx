import React, { useEffect, useMemo, useState } from "react";
import { useModel } from "../../../../components/use-model";
import { Material, MeshPhysicalMaterial, Object3D } from "three";
import { ModelManager } from "../../model_manager";

const FrontPanels = () => {
  const { model } = useModel();
  const [frontPanels, setFrontPanels] = useState<Object3D[]>([]);

  const panelMaterials = useMemo(() => {
    const materials: Material[] = [];

    const brassMaterial = new MeshPhysicalMaterial({
      color: 0xd4af37, // Gold-like color for brass
      roughness: 0.3, // Slightly rough to simulate brass
      metalness: 1.0, // Full metallic to resemble brass
      emissive: 0xffd700, // Optional: Add an emissive color if you want it to glow
      emissiveIntensity: 0.5,
    });

    const darkAluminumMaterial = new MeshPhysicalMaterial({
      color: 0x2a2a2a, // Dark gray color
      metalness: 0.25, // Full metallic effect for aluminum
      roughness: 0.3, // Slight roughness for a brushed appearance
      reflectivity: 0.8, // Reflectivity to give it a polished look
      clearcoat: 0.1, // Adds a subtle clear coat for additional gloss
      clearcoatRoughness: 0.15, // Slight roughness on the clear coat layer
    });

    materials.push(brassMaterial);
    materials.push(darkAluminumMaterial);

    return materials;
  }, []);

  useEffect(() => {
    if (!model) return;

    const frontPanels = ModelManager.getObjectsByNames(model, [
      "top_front_panel",
      "front_center_panel",
    ]);

    setFrontPanels(frontPanels);
  }, [model]);

  return (
    <>
      {frontPanels.map((panel, index) => (
        <primitive
          key={index}
          object={panel}
          material={panelMaterials[index]}
        />
      ))}
    </>
  );
};

export default FrontPanels;
