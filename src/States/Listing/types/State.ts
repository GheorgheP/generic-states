import { Item } from "./Item";

// region Loading
export interface Loading<T extends string> {
  stateId: `${T}:Loading`;
}

export const isLoading =
  <T extends string>(i: T) =>
  (s: Listing<T>): s is Loading<T> =>
    s.stateId === `${i}:Loading`;

export const loading =
  <T extends string>(t: T) =>
  (): Loading<T> => ({
    stateId: `${t}:Loading` as `${T}:Loading`,
  });
// endregion

// region LoadError
export interface LoadError<T extends string> {
  stateId: `${T}:LoadError`;
  message: string;
}

export const isLoadError =
  <T extends string>(i: T) =>
  (s: Listing<T>): s is LoadError<T> =>
    s.stateId === `${i}:LoadError`;

export const loadError =
  <T extends string>(i: T) =>
  (message: string): LoadError<T> => ({
    stateId: `${i}:LoadError` as `${T}:LoadError`,
    message,
  });
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

export const ready =
  <T extends string>(i: T) =>
  (items: Item[]): Ready<T> => ({
    stateId: `${i}:Ready` as `${T}:Ready`,
    items,
  });
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

export const searching =
  <T extends string>(i: T) =>
  (items: Item[], term: string): Searching<T> => ({
    stateId: `${i}:Searching` as `${T}:Searching`,
    items,
    term,
  });
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

export const removeConfirmation =
  <T extends string>(i: T) =>
  (id: number, items: Item[]): RemoveConfirmation<T> => ({
    stateId: `${i}:RemoveConfirmation` as `${T}:RemoveConfirmation`,
    id,
    items,
  });
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

export const removing =
  <T extends string>(i: T) =>
  (id: number, items: Item[]): Removing<T> => ({
    stateId: `${i}:Removing` as `${T}:Removing`,
    id,
    items,
  });
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
