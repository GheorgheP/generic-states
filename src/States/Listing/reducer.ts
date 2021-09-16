import { Actions, Types } from "./types/Actions";
import * as State from "./types/State";
import { Item } from "../../Sdks/types/Item";

export const createReducer =
  <T extends string>(t: T) =>
  (s: State.Listing<T, Item>, a: Actions<Item>): State.Listing<T, Item> => {
    switch (a.type) {
      case Types.Fail:
        return State.isLoading(t)(s) ? State.loadError(t)(a.payload) : s;
      case Types.Success:
        return State.isLoading(t)(s) ? State.ready(t)(a.payload) : s;
      case Types.Search:
        return State.isReady(t)(s) ? State.searching(t)(s.items, a.payload) : s;
      case Types.SearchFail:
        return State.isSearching(t)(s) ? State.ready(t)(s.items) : s;
      case Types.SearchSuccess:
        return State.isSearching(t)(s) ? State.ready(t)(s.items) : s;
      case Types.Remove:
        return State.isReady(t)(s)
          ? State.removeConfirmation(t)(a.payload, s.items)
          : s;
      case Types.RemoveDeny:
        return State.isRemoveConfirmation(t)(s) ? State.ready(t)(s.items) : s;
      case Types.RemoveApprove:
        return State.isRemoveConfirmation(t)(s)
          ? State.removing(t)(s.id, s.items)
          : s;
      case Types.RemoveFail:
        return State.isRemoving(t)(s) ? State.ready(t)(s.items) : s;
      case Types.RemoveSuccess:
        return State.isRemoving(t)(s) ? State.ready(t)(a.payload) : s;
    }
  };
