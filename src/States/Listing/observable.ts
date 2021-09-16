import { Epic } from "redux-observable";
import * as Actions from "./types/Actions";
import * as State from "./types/State";
import { catchError, map, switchMap } from "rxjs/operators";
import { EMPTY, from, Observable, of } from "rxjs";
import { Action } from "redux";

export interface Sdk<I> {
  getItems: (s?: string) => Promise<I[]>;
  remove: (id: number) => Promise<I[]>;
}

const loadingObservable = <I>(sdk: Sdk<I>): Observable<Actions.Actions<I>> => {
  return from(sdk.getItems()).pipe(
    map(Actions.success),
    catchError(() => of(Actions.fail("Unable to load")))
  );
};

const searchObservable = <I>(
  sdk: Sdk<I>,
  s: string
): Observable<Actions.Actions<I>> => {
  return from(sdk.getItems(s)).pipe(
    map(Actions.searchSuccess),
    catchError(() => of(Actions.searchFail("Unable to load")))
  );
};

const removeObservable = <I>(
  sdk: Sdk<I>,
  id: number
): Observable<Actions.Actions<I>> => {
  return from(sdk.remove(id)).pipe(
    map(Actions.removeSuccess),
    catchError(() => of(Actions.removeFail("Unable to remove")))
  );
};

export const createObservable =
  <T extends string, I>(
    t: T,
    sdk: Sdk<I>
  ): Epic<Action, Actions.Actions<I>, State.Listing<T, I>> =>
  (action$, state$) =>
    state$.pipe(
      switchMap((s) => {
        if (State.isLoading(t)(s)) return loadingObservable(sdk);
        if (State.isSearching(t)(s)) return searchObservable(sdk, s.term);
        if (State.isRemoving(t)(s)) return removeObservable(sdk, s.id);
        return EMPTY;
      })
    );
