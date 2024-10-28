import React, { useEffect, useMemo, useState } from "react";
import { useModel } from "../../../../components/use-model";
import { ModelManager } from "../../model_manager";
import { MeshPhysicalMaterial, Object3D } from "three";

const GlassCasing = () => {
  const { model } = useModel();
  const [elms, setElms] = useState<Object3D[]>([]);

  const material = useMemo(() => {
    const mat = new MeshPhysicalMaterial({
      color: "gray",
      metalness: 0.8,
      roughness: 0.1,
    });

    return mat;
  }, []);

  useEffect(() => {
    if (!model) return;

    const elms = ModelManager.getObjectsByNames(model, [
      "glass_casing",
      "front_panel_casing",
    ]);

    setElms(elms);
  }, []);
  return (
    <>
      {elms.map((elm, index) => (
        <primitive key={index} object={elm} material={material} />
      ))}
    </>
  );
};

export default GlassCasing;
