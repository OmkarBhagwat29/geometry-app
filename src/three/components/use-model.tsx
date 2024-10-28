import { useContext } from "react";
import { ModelContext } from "./model-provider";

export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("Use model must be used within a ModelProvider");
  }

  return context;
};
