import { Action } from "redux";

export enum Types {
  Fail = "Fail",
  Success = "Success",
  Search = "Search",
  SearchFail = "SearchFail",
  SearchSuccess = "SearchSuccess",
  Remove = "Remove",
  RemoveApprove = "RemoveApprove",
  RemoveDeny = "RemoveDeny",
  RemoveFail = "RemoveFail",
  RemoveSuccess = "RemoveSuccess",
}

// region Fail
export interface Fail {
  type: Types.Fail;
  payload: string;
}

export const fail = (payload: Fail["payload"]): Fail => ({
  type: Types.Fail,
  payload,
});
// endregion

// region Success
export interface Success<I> {
  type: Types.Success;
  payload: I[];
}

export const success = <I>(payload: Success<I>["payload"]): Success<I> => ({
  type: Types.Success,
  payload,
});
// endregion

// region Search
export interface Search {
  type: Types.Search;
  payload: string;
}

export const search = (payload: Search["payload"]): Search => ({
  type: Types.Search,
  payload,
});
// endregion

// region SearchFail
export interface SearchFail {
  type: Types.SearchFail;
  payload: string;
}

export const searchFail = (payload: SearchFail["payload"]): SearchFail => ({
  type: Types.SearchFail,
  payload,
});
// endregion

// region SearchSuccess
export interface SearchSuccess<I> {
  type: Types.SearchSuccess;
  payload: I[];
}
export const searchSuccess = <I>(
  payload: SearchSuccess<I>["payload"]
): SearchSuccess<I> => ({ type: Types.SearchSuccess, payload });
// endregion

// region Remove
export interface Remove {
  type: Types.Remove;
  payload: number;
}
export const remove = (payload: Remove["payload"]): Remove => ({
  type: Types.Remove,
  payload,
});
// endregion

// region RemoveApprove
export interface RemoveApprove {
  type: Types.RemoveApprove;
}

export const removeApprove = (): RemoveApprove => ({
  type: Types.RemoveApprove,
});
// endregion

// region RemoveDeny
export interface RemoveDeny {
  type: Types.RemoveDeny;
}

export const removeDeny = (): RemoveDeny => ({ type: Types.RemoveDeny });
// endregion

// region RemoveFail
export interface RemoveFail {
  type: Types.RemoveFail;
  payload: string;
}

export const removeFail = (payload: RemoveFail["payload"]): RemoveFail => ({
  type: Types.RemoveFail,
  payload,
});
// endregion

// region RemoveSuccess
export interface RemoveSuccess<I> {
  type: Types.RemoveSuccess;
  payload: I[];
}

export const removeSuccess = <I>(
  payload: RemoveSuccess<I>["payload"]
): RemoveSuccess<I> => ({ type: Types.RemoveSuccess, payload });
// endregion

export type Actions<I> =
  | Fail
  | Success<I>
  | Search
  | SearchFail
  | SearchSuccess<I>
  | Remove
  | RemoveApprove
  | RemoveDeny
  | RemoveFail
  | RemoveSuccess<I>;

export const isActions = <I>(a: Action): a is Actions<I> =>
  Object.values(Types).includes(a.type);
