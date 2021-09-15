import { Item } from "./Item";
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
export interface Success {
  type: Types.Success;
  payload: Item[];
}

export const success = (payload: Success["payload"]): Success => ({
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
export interface SearchSuccess {
  type: Types.SearchSuccess;
  payload: Item[];
}
export const searchSuccess = (
  payload: SearchSuccess["payload"]
): SearchSuccess => ({ type: Types.SearchSuccess, payload });
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
export interface RemoveSuccess {
  type: Types.RemoveSuccess;
  payload: Item[];
}

export const removeSuccess = (
  payload: RemoveSuccess["payload"]
): RemoveSuccess => ({ type: Types.RemoveSuccess, payload });
// endregion

export type Actions =
  | Fail
  | Success
  | Search
  | SearchFail
  | SearchSuccess
  | Remove
  | RemoveApprove
  | RemoveDeny
  | RemoveFail
  | RemoveSuccess;

export const isActions = (a: Action): a is Actions =>
  Object.values(Types).includes(a.type);
