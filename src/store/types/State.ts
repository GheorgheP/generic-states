import * as Listing from "../../States/Listing/types/State";

type Ids = "Houses" | "Cars" | "Cats"

// region Houses
export type Houses = Listing.Listing<"Houses">;

export const isHouses = (s: State): s is Houses => Listing.isState<Ids, State>("Houses", s);
export const houses = (): Houses => ({ stateId: "Houses:Loading" });
// endregion

// region Cars
export type Cars = Listing.Listing<"Cars">;

export const isCars = (s: State): s is Cars => Listing.isState<Ids, State>("Cars", s);
export const cars = (): Cars => ({ stateId: "Cars:Loading" });
// endregion

// region Cats
export type Cats = Listing.Listing<"Cats">;

export const isCats = (s: State): s is Cats => Listing.isState<Ids, State>("Cats", s);
export const cats = (): Cats => ({ stateId: "Cats:Loading" });
// endregion

export type State = Houses | Cars | Cats;

export const isState = (s: State): s is State => true;
