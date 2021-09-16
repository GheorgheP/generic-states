// region Loading
export interface Loading<T extends string> {
  stateId: `${T}:Loading`;
}

export function isLoading<T extends string>(i: T): <I>(s: Listing<T, I>) => s is Loading<T>;
export function isLoading<T extends string, I>(i: T): (s: Listing<T, I>) => s is Loading<T>;
export function isLoading<T extends string, I>(i: T) {
  return (s: Listing<T, I>): s is Loading<T> => s.stateId === `${i}:Loading`;
}

export function loading<T extends string>(t: T): () => Loading<T> {
  return () => ({ stateId: `${t}:Loading` as `${T}:Loading` });
}
// endregion

// region LoadError
export interface LoadError<T extends string> {
  stateId: `${T}:LoadError`;
  message: string;
}

export function isLoadError<T extends string, I>(i: T): (s: Listing<T, I>) => s is LoadError<T>;
export function isLoadError<T extends string>(i: T): <I>(s: Listing<T, I>) => s is LoadError<T>;
export function isLoadError<T extends string>(i: T): <I>(s: Listing<T, I>) => s is LoadError<T> {
  return (s): s is LoadError<T> => s.stateId === `${i}:LoadError`;
}

export function loadError<T extends string>(i: T): (message: string) => LoadError<T> {
  return (message) => ({
    stateId: `${i}:LoadError` as `${T}:LoadError`,
    message,
  });
}
// endregion

// region Ready
export interface Ready<T extends string, I> {
  stateId: `${T}:Ready`;
  items: I[];
}

export function isReady<T extends string>(i: T): <I>(s: Listing<T, I>) => s is Ready<T, I>;
export function isReady<T extends string, I>(i: T): (s: Listing<T, I>) => s is Ready<T, I>;
export function isReady<T extends string, I>(i: T): (s: Listing<T, I>) => s is Ready<T, I> {
  return (s): s is Ready<T, I> => s.stateId === `${i}:Ready`;
}

export function ready<T extends string>(i: T): <I>(items: I[]) => Ready<T, I>;
export function ready<T extends string, I>(i: T): (items: I[]) => Ready<T, I>;
export function ready<T extends string, I>(i: T): (items: I[]) => Ready<T, I> {
  return (items) => ({
    stateId: `${i}:Ready` as `${T}:Ready`,
    items,
  });
}
// endregion

// region Searching
export interface Searching<T extends string, I> {
  stateId: `${T}:Searching`;
  term: string;
  items: I[];
}

export function isSearching<T extends string>(i: T): <I>(s: Listing<T, I>) => s is Searching<T, I>;
export function isSearching<T extends string, I>(i: T): (s: Listing<T, I>) => s is Searching<T, I>;
export function isSearching<T extends string, I>(i: T): (s: Listing<T, I>) => s is Searching<T, I> {
  return (s): s is Searching<T, I> => s.stateId === `${i}:Searching`;
}

export function searching<T extends string>(i: T): <I>(items: I[], term: string) => Searching<T, I>;
export function searching<T extends string, I>(i: T): (items: I[], term: string) => Searching<T, I>;
export function searching<T extends string, I>(i: T): (items: I[], term: string) => Searching<T, I> {
  return (items, term) => ({
    stateId: `${i}:Searching` as `${T}:Searching`,
    items,
    term,
  });
}
// endregion

// region RemoveConfirmation
export interface RemoveConfirmation<T extends string, I> {
  stateId: `${T}:RemoveConfirmation`;
  id: number;
  items: I[];
}

export function isRemoveConfirmation<T extends string>(i: T): <I>(s: Listing<T, I>) => s is RemoveConfirmation<T, I>;
export function isRemoveConfirmation<T extends string, I>(i: T): (s: Listing<T, I>) => s is RemoveConfirmation<T, I>;
export function isRemoveConfirmation<T extends string, I>(i: T): (s: Listing<T, I>) => s is RemoveConfirmation<T, I> {
  return (s): s is RemoveConfirmation<T, I> => s.stateId === `${i}:RemoveConfirmation`;
}

export function removeConfirmation<T extends string>(i: T): <I>(id: number, items: I[]) => RemoveConfirmation<T, I>;
export function removeConfirmation<T extends string, I>(i: T): (id: number, items: I[]) => RemoveConfirmation<T, I>;
export function removeConfirmation<T extends string, I>(i: T): (id: number, items: I[]) => RemoveConfirmation<T, I> {
  return (id, items) => ({
    stateId: `${i}:RemoveConfirmation` as `${T}:RemoveConfirmation`,
    id,
    items,
  });
}
// endregion

// region Removing
export interface Removing<T extends string, I> {
  stateId: `${T}:Removing`;
  id: number;
  items: I[];
}

export function isRemoving<T extends string>(i: T): <I>(s: Listing<T, I>) => s is Removing<T, I>;
export function isRemoving<T extends string, I>(i: T): (s: Listing<T, I>) => s is Removing<T, I>;
export function isRemoving<T extends string, I>(i: T): (s: Listing<T, I>) => s is Removing<T, I> {
  return (s): s is Removing<T, I> => s.stateId === `${i}:Removing`;
}

export function removing<T extends string>(i: T): <I>(id: number, items: I[]) => Removing<T, I>;
export function removing<T extends string, I>(i: T): (id: number, items: I[]) => Removing<T, I>;
export function removing<T extends string, I>(i: T): (id: number, items: I[]) => Removing<T, I> {
  return (id, items) => ({
    stateId: `${i}:Removing` as `${T}:Removing`,
    id,
    items,
  });
}
// endregion

export type Listing<T extends string, I> =
  | Loading<T>
  | LoadError<T>
  | Ready<T, I>
  | Searching<T, I>
  | RemoveConfirmation<T, I>
  | Removing<T, I>;

export const isState = <T extends string, I, S extends Listing<T, I>>(
  t: T,
  s: S,
  // @ts-expect-error
): s is Listing<T> =>
  isLoading(t)(s) ||
  isLoadError(t)(s) ||
  isReady(t)(s) ||
  isSearching(t)(s) ||
  isRemoveConfirmation(t)(s) ||
  isRemoving(t)(s);
