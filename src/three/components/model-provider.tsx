import React, { createContext, FC, ReactNode, useState } from "react";
import { Object3D } from "three";

export const ModelContext = createContext<
  | {
      model: Object3D | null;
      setModel: (model: Object3D | null) => void;
      loaded: boolean;
      setLoaded: (loaded: boolean) => void;
    }
  | undefined
>(undefined);

export const ModelProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [model, setModel] = useState<Object3D | null>(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <ModelContext.Provider value={{ model, setModel, loaded, setLoaded }}>
      {children}
    </ModelContext.Provider>
  );
};
