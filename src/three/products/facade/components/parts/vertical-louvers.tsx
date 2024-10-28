import React, { useEffect, useMemo, useState } from "react";
import { useModel } from "../../../../components/use-model";
import { ModelManager } from "../../model_manager";
import { MeshPhysicalMaterial, Object3D, SRGBColorSpace } from "three";
import { useTexture } from "@react-three/drei";

const VerticalLouvers = () => {
  const { model } = useModel();
  const [louvers, setLouvers] = useState<Object3D[]>([]);

  const defaultPath = "./rhino/texture/Wood_027_SD";

  //   const woodTextureProps = useTexture({
  //     map: `${defaultPath}/Wood_027_basecolor.jpg`,

  //   });

  const textruePaths = [
    `${defaultPath}/Wood_027_basecolor.jpg`,
    `${defaultPath}/Wood_027_ambientOcclusion.jpg`,
    `${defaultPath}/Wood_027_normal.jpg`,
    `${defaultPath}/Wood_027_roughness.jpg`,
  ];

  const [woodTexture, ao, normal, roughness] = useTexture(textruePaths);

  const material = useMemo(() => {
    const mat = new MeshPhysicalMaterial({
      map: woodTexture,
      aoMap: ao,
      normalMap: normal,
      roughnessMap: roughness,
      roughness: 0.5,
      metalness: 0.2,
    });

    console.log("loaded");

    return mat;
  }, [woodTexture, ao, normal, roughness]);

  useEffect(() => {
    if (!model) return;

    const louvers = ModelManager.getObjectsByNames(model, ["vertical_louvers"]);
    setLouvers(louvers);
  }, [model]);

  return (
    <>
      {louvers.map((louver, index) => (
        <primitive key={index} object={louver} material={material} />
      ))}
    </>
  );
};

export default VerticalLouvers;
