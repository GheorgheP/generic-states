import { Epic } from "redux-observable";
import * as Actions from "./types/Actions";
import * as State from "./types/State";
import { catchError, map, switchMap } from "rxjs/operators";
import { EMPTY, from, Observable, of } from "rxjs";
import { Item } from "./types/Item";
import { Action } from "redux";

export interface Sdk {
  getItems: (s?: string) => Promise<Item[]>;
  remove: (id: number) => Promise<Item[]>;
}

const loadingObservable = (sdk: Sdk): Observable<Actions.Actions> => {
  return from(sdk.getItems()).pipe(
    map(Actions.success),
    catchError(() => of(Actions.fail("Unable to load")))
  );
};

const searchObservable = (sdk: Sdk, s: string): Observable<Actions.Actions> => {
  return from(sdk.getItems(s)).pipe(
    map(Actions.searchSuccess),
    catchError(() => of(Actions.searchFail("Unable to load")))
  );
};

const removeObservable = (
  sdk: Sdk,
  id: number
): Observable<Actions.Actions> => {
  return from(sdk.remove(id)).pipe(
    map(Actions.removeSuccess),
    catchError(() => of(Actions.removeFail("Unable to remove")))
  );
};

export const createObservable =
  <T extends string>(
    t: T,
    sdk: Sdk
  ): Epic<Action, Actions.Actions, State.Listing<T>> =>
  (action$, state$) =>
    state$.pipe(
      switchMap((s) => {
        if (State.isLoading(t)(s)) return loadingObservable(sdk);
        if (State.isSearching(t)(s)) return searchObservable(sdk, s.term);
        if (State.isRemoving(t)(s)) return removeObservable(sdk, s.id);
        return EMPTY;
      })
    );
