import { Epic } from "redux-observable";
import { Actions } from "./types/Actions";
import * as State from "./types/State";
import { createObservable } from "../States/Listing/observable";
import { Houses } from "../Sdks/Houses";
import { EMPTY } from "rxjs";

const housesEpic = createObservable("Houses", Houses);
const carsEpic = createObservable("Cars", Houses);
const catsEpic = createObservable("Cats", Houses);

export const observable: Epic<Actions, Actions, State.State> = (
  action$,
  state$,
  deps
) => {
  // @ts-ignore
  if (State.isHouses(state$.value)) return housesEpic(action$, state$, deps);
  // @ts-ignore
  if (State.isCars(state$.value)) return carsEpic(action$, state$, deps);
  // @ts-ignore
  if (State.isCats(state$.value)) return catsEpic(action$, state$, deps);

  return EMPTY;
};
