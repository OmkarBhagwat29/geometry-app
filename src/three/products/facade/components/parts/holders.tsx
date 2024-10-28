import React, { useEffect, useMemo, useState } from "react";
import { useModel } from "../../../../components/use-model";
import { Color, MeshStandardMaterial, Object3D } from "three";
import { ModelManager } from "../../model_manager";

const Holders = () => {
  const { model } = useModel();
  const [holders, setHolders] = useState<Object3D[]>([]);

  const material = useMemo(() => {
    return new MeshStandardMaterial({
      color: new Color(0xcd7f32), // Bronze-like color
      roughness: 0.3, // Adjust roughness for shininess
      metalness: 1.0, // Set metalness to maximum for a metallic look
    });
  }, []);

  useEffect(() => {
    if (!model) return;

    const holders = ModelManager.getObjectsByNames(model, ["holders"]);
    setHolders(holders);
  }, [model]);
  return (
    <>
      {holders.map((obj, index) => (
        <primitive key={index} object={obj} material={material} />
      ))}
    </>
  );
};

export default Holders;
