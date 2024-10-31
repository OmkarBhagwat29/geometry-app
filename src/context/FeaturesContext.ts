import { createContext, useContext } from "react";
import { Object3D } from "three";

export type FeatureType = "test" | "point_line_rel" | "FK" | "IK" | null;

interface FeatureContextProps {
  feature: FeatureType;
  runFeature: (feature: FeatureType) => void;
}

export const FeatureContext = createContext<FeatureContextProps>({
  feature: null,
  runFeature: (feature: FeatureType) => {},
});

export const useFeature = () => {
  return useContext(FeatureContext);
};

export const FeatureProvider = FeatureContext.Provider;
