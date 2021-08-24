import { Epic } from "redux-observable";
import { Actions, Types } from "./types/Actions";
import * as State from "./types/State";
import { catchError, map, switchMap } from "rxjs/operators";
import { EMPTY, from, Observable, of } from "rxjs";
import { Item } from "./types/Item";
import { Action } from "redux";

export interface Sdk {
  getItems: (s?: string) => Promise<Item[]>;
  remove: (id: number) => Promise<Item[]>;
}

const loadingObservable = (sdk: Sdk): Observable<Actions> => {
  return from(sdk.getItems()).pipe(
    map(
      (payload) => ({ type: Types.Success, payload }),
      catchError(() => of({ type: Types.Fail, payload: "Unable to load" }))
    )
  );
};

const searchObservable = (sdk: Sdk, s: string): Observable<Actions> => {
  return from(sdk.getItems(s)).pipe(
    map(
      (payload) => ({ type: Types.SearchSuccess, payload }),
      catchError(() =>
        of({ type: Types.SearchFail, payload: "Unable to load" })
      )
    )
  );
};

const removeObservable = (sdk: Sdk, id: number): Observable<Actions> => {
  return from(sdk.remove(id)).pipe(
    map(
      (payload) => ({ type: Types.RemoveSuccess, payload }),
      catchError(() =>
        of({ type: Types.RemoveFail, payload: "Unable to remove" })
      )
    )
  );
};

export const createObservable =
  <T extends string>(t: T, sdk: Sdk): Epic<Action, Actions, State.Listing<T>> =>
  (action$, state$) => {
    return state$.pipe(
      switchMap((s) => {
        if (State.isLoading(t, s)) return loadingObservable(sdk);
        if (State.isSearching(t, s)) return searchObservable(sdk, s.term);
        if (State.isRemoving(t, s)) return removeObservable(sdk, s.id);
        return EMPTY;
      })
    );
  };
