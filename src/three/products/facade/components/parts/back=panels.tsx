import React, { useEffect, useMemo, useState } from "react";
import { useModel } from "../../../../components/use-model";
import { Color, MeshStandardMaterial, Object3D } from "three";
import { ModelManager } from "../../model_manager";

const BackPanels = () => {
  const { model } = useModel();
  const [backPanels, setBackPanels] = useState<Object3D[]>([]);

  const material = useMemo(() => {
    return new MeshStandardMaterial({
      color: "lightgray", // Light gray, similar to aluminum
      roughness: 0.2, // Low roughness for a semi-polished appearance
      metalness: 0.5, // Max metalness for a metallic look
    });
  }, []);

  useEffect(() => {
    if (!model) return;

    const panels = ModelManager.getObjectsByNames(model, [
      "back_top_panel",
      "back_center_panel",
    ]);

    setBackPanels(panels);
  }, [model]);

  return (
    <>
      {backPanels.map((panel, index) => (
        <primitive key={index} object={panel} material={material} />
      ))}
    </>
  );
};

export default BackPanels;
