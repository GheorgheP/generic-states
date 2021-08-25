import { Item } from "./Item";

// region Loading
export interface Loading<T extends string> {
  stateId: `${T}:Loading`;
}

export const isLoading =
  <T extends string>(i: T) =>
  (s: Listing<T>): s is Loading<T> =>
    s.stateId === `${i}:Loading`;
// endregion

// region LoadError
export interface LoadError<T extends string> {
  stateId: `${T}:LoadError`;
}

export const isLoadError =
  <T extends string>(i: T) =>
  (s: Listing<T>): s is LoadError<T> =>
    s.stateId === `${i}:LoadError`;
// endregion

// region Ready
export interface Ready<T extends string> {
  stateId: `${T}:Ready`;
  items: Item[];
}

export const isReady =
  <T extends string>(i: T) =>
  (s: Listing<T>): s is Ready<T> =>
    s.stateId === `${i}:Ready`;
// endregion

// region Searching
export interface Searching<T extends string> {
  stateId: `${T}:Searching`;
  term: string;
  items: Item[];
}

export const isSearching =
  <T extends string>(i: T) =>
  (s: Listing<T>): s is Searching<T> =>
    s.stateId === `${i}:Searching`;
// endregion

// region RemoveConfirmation
export interface RemoveConfirmation<T extends string> {
  stateId: `${T}:RemoveConfirmation`;
  id: number;
  items: Item[];
}

export const isRemoveConfirmation =
  <T extends string>(i: T) =>
  (s: Listing<T>): s is RemoveConfirmation<T> =>
    s.stateId === `${i}:RemoveConfirmation`;
// endregion

// region Removing
export interface Removing<T extends string> {
  stateId: `${T}:Removing`;
  id: number;
  items: Item[];
}

export const isRemoving =
  <T extends string>(i: T) =>
  (s: Listing<T>): s is Removing<T> =>
    s.stateId === `${i}:Removing`;
// endregion

export type Listing<T extends string> =
  | Loading<T>
  | LoadError<T>
  | Ready<T>
  | Searching<T>
  | RemoveConfirmation<T>
  | Removing<T>;

export const isState = <T extends string, S extends Listing<T>>(
  t: T,
  s: S
  // @ts-expect-error
): s is Listing<T> =>
  isLoading(t)(s) ||
  isLoadError(t)(s) ||
  isReady(t)(s) ||
  isSearching(t)(s) ||
  isRemoveConfirmation(t)(s) ||
  isRemoving(t)(s);
