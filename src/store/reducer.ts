import * as State from "./types/State";
import * as Actions from "./types/Actions";
import { match2 } from "fp-utilities/dist/match2";
import { Reducer } from "redux";
import { createReducer } from "../States/Listing/reducer";

export const switchReducer: (
  s: State.State,
  a: Actions.SwitchActions
) => State.State | undefined = match2(
  [State.isState, Actions.isGotToHouses, State.houses],
  [State.isState, Actions.isGotToCars, State.cars],
  [State.isState, Actions.isGotToCats, State.cats]
);

export const innerReducer: (
  s: State.State,
  a: Actions.InnerActions
) => State.State | undefined = match2(
  [State.isHouses, Actions.isInnerActions, createReducer("Houses")],
  [State.isCars, Actions.isInnerActions, createReducer("Cars")],
  [State.isCats, Actions.isInnerActions, createReducer("Cats")]
);

export const _reducer: (
  s: State.State,
  a: Actions.Actions
) => State.State | undefined = match2(
  [State.isState, Actions.isSwitchActions, switchReducer],
  [State.isState, Actions.isInnerActions, innerReducer]
);

export const reducer: Reducer<State.State, Actions.Actions> = (
  s = State.houses(),
  a
) => _reducer(s, a) ?? s;
