import { applyMiddleware, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { reducer } from "./reducer";
import { observable } from "./observable";
import { Actions } from "./types/Actions";
import { State } from "./types/State";

export const getStore = () => {
  const middleware = createEpicMiddleware<Actions, Actions, State>();
  const store = createStore(reducer, applyMiddleware(middleware));

  middleware.run(observable);

  return store;
};
