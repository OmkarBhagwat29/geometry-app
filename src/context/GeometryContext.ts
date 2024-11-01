import { createContext, useContext } from "react";
import { Object3D } from "three";

export type CADType = "line" | "point" | "polyline" | null;

interface GeometryContextProps {
  objects: Object3D[];
  command: CADType;
  runCommand: (command: CADType) => void;
  addObject: (obj: Object3D) => void;
  addObjects: (objs: Object3D[]) => void;
}

export const GeometryContext = createContext<GeometryContextProps>({
  objects: [],
  command: null,
  runCommand: (command: CADType) => {},
  addObject: (obj: Object3D) => {},
  addObjects: (objs: Object3D[]) => {},
});

export const useGeometry = () => {
  return useContext(GeometryContext);
};

export const GeometryProvider = GeometryContext.Provider;
