import { Epic } from "redux-observable";
import { Actions } from "./types/Actions";
import * as State from "./types/State";
import { createObservable } from "../States/Listing/observable";
import { Houses } from "../Sdks/Houses";
import { EMPTY, switchMap } from "rxjs";
import { Cars } from "../Sdks/Cars";
import { Cats } from "../Sdks/Cats";

const housesEpic = createObservable("Houses", Houses);
const carsEpic = createObservable("Cars", Cars);
const catsEpic = createObservable("Cats", Cats);

export const observable: Epic<Actions, Actions, State.State> = (
  action$,
  state$,
  deps
) =>
  state$.pipe(
    switchMap((s) => {
      // @ts-ignore
      if (State.isHouses(s)) return housesEpic(action$, state$, deps);
      // @ts-ignore
      if (State.isCars(s)) return carsEpic(action$, state$, deps);
      // @ts-ignore
      if (State.isCats(s)) return catsEpic(action$, state$, deps);

      return EMPTY;
    })
  );
