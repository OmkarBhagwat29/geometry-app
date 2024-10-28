import { createContext, useContext } from "react";
import { initialState, State } from "./state";
import { Action } from "../middleware/actions";

export const appContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => {},
]);

export const useAppContext = () => {
  return useContext(appContext);
};
