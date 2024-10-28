import { useLoader } from "@react-three/fiber";
import React, { FC, useEffect } from "react";
import { GLTFLoader, Rhino3dmLoader } from "three/examples/jsm/Addons.js";
import { Object3D } from "three";
import { useModel } from "./use-model";
import { toRadians } from "../../kernel/core";

export interface modelLoaderProps {
  pathUrl: string;
  loader: typeof Rhino3dmLoader | typeof GLTFLoader;
}

const ModelLoader: FC<modelLoaderProps> = ({ pathUrl, loader }) => {
  const { setModel } = useModel(); //access the context

  const loadedModel = useLoader(loader, pathUrl, (instanceLoader) => {
    if (instanceLoader instanceof Rhino3dmLoader) {
      instanceLoader.setLibraryPath(
        "https://cdn.jsdelivr.net/npm/rhino3dm@8.0.1/"
      );
    } else {
      //additional loaders
    }
  });

  useEffect(() => {
    if (loadedModel && loadedModel instanceof Object3D) {
      setModel(loadedModel);
    }
  }, []);

  return <></>;
};

export default ModelLoader;
