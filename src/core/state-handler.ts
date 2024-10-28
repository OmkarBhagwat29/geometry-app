import { Action } from "../middleware/actions";
import { User } from "../models/user";
import { State } from "./state";

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: new User(action.payload.token),
      };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};
