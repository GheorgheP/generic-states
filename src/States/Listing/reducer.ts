import { Actions, Types } from "./types/Actions";
import * as State from "./types/State";

export const createReducer =
  <T extends string>(t: T) =>
  (s: State.Listing<T>, a: Actions): State.Listing<T> => {
    switch (a.type) {
      case Types.Fail:
        return State.isLoading(t, s) ? { stateId: `${t}:LoadError` } : s;
      case Types.Success:
        return State.isLoading(t, s)
          ? { stateId: `${t}:Ready`, items: a.payload }
          : s;
      case Types.Search:
        return State.isReady(t, s)
          ? { stateId: `${t}:Searching`, term: a.payload, items: s.items }
          : s;
      case Types.SearchFail:
        return State.isSearching(t, s)
          ? { stateId: `${t}:Ready`, items: s.items }
          : s;
      case Types.SearchSuccess:
        return State.isSearching(t, s)
          ? { stateId: `${t}:Ready`, items: a.payload }
          : s;
      case Types.Remove:
        return State.isReady(t, s)
          ? {
              stateId: `${t}:RemoveConfirmation`,
              id: a.payload,
              items: s.items,
            }
          : s;
      case Types.RemoveDeny:
        return State.isRemoveConfirmation(t, s)
          ? { stateId: `${t}:Ready`, items: s.items }
          : s;
      case Types.RemoveApprove:
        return State.isRemoveConfirmation(t, s)
          ? { stateId: `${t}:Removing`, id: s.id, items: s.items }
          : s;
      case Types.RemoveFail:
        return State.isRemoving(t, s)
          ? { stateId: `${t}:Ready`, items: s.items }
          : s;
      case Types.RemoveSuccess:
        return State.isRemoving(t, s)
          ? { stateId: `${t}:Ready`, items: a.payload }
          : s;
    }
  };
