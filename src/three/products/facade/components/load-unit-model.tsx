import React, { useEffect } from "react";
import { toRadians } from "../../../../kernel/core";
import ModelLoader from "../../../components/model-loader";
import { Rhino3dmLoader } from "three/examples/jsm/Addons.js";
import { useModel } from "../../../components/use-model";

const LoadUnitModel = () => {
  const { model, setLoaded } = useModel();

  useEffect(() => {
    if (!model) return;

    model.children.forEach((child) => {
      child.rotation.set(toRadians(-90), 0, 0);
      child.receiveShadow = true;
      child.castShadow = true;
    });

    setLoaded(true);
  }, [model]);

  return (
    <>
      <ModelLoader pathUrl="./rhino/hss_unit.3dm" loader={Rhino3dmLoader} />
      {/* {model && <primitive object={model} />} */}
    </>
  );
};

export default LoadUnitModel;
