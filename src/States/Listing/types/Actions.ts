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
// endregion

// region Success
export interface Success {
  type: Types.Success;
  payload: Item[];
}
// endregion

// region Search
export interface Search {
  type: Types.Search;
  payload: string;
}
// endregion

// region SearchFail
export interface SearchFail {
  type: Types.SearchFail;
  payload: string;
}
// endregion

// region SearchSuccess
export interface SearchSuccess {
  type: Types.SearchSuccess;
  payload: Item[];
}
// endregion

// region Remove
export interface Remove {
  type: Types.Remove;
  payload: number;
}
// endregion

// region RemoveApprove
export interface RemoveApprove {
  type: Types.RemoveApprove;
}
// endregion

// region RemoveDeny
export interface RemoveDeny {
  type: Types.RemoveDeny;
}
// endregion

// region RemoveFail
export interface RemoveFail {
  type: Types.RemoveFail;
  payload: string;
}
// endregion

// region RemoveSuccess
export interface RemoveSuccess {
  type: Types.RemoveSuccess;
  payload: Item[];
}
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
