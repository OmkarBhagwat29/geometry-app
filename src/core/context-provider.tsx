import React, { FC, PropsWithChildren, useReducer } from "react";
import { reducer } from "./state-handler";
import { initialState } from "./state";
import { Action } from "../middleware/actions";
import { appContext } from "./app-context";
import { executeCore } from "./core-handler";

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useReducer(reducer, initialState);

  const dispatch = async (value: Action) => {
    setState(value);
    executeCore(value);
    //excute the core here
  };

  return (
    <appContext.Provider value={[state, dispatch]}>
      {children}
    </appContext.Provider>
  );
};
