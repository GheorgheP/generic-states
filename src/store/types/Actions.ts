import { Action } from "redux";
import * as ListingActions from "../../States/Listing/types/Actions";
import { Item } from "../../Sdks/types/Item";

// region GotToHouses
export type GotToHouses = Action<"GotToHouses">;
export const isGotToHouses = (a: Actions): a is GotToHouses =>
  a.type === "GotToHouses";
export const goToHouses = (): GotToHouses => ({ type: "GotToHouses" });
// endregion

// region GoToCars
export type GotToCars = Action<"GotToCars">;
export const isGotToCars = (a: Actions): a is GotToCars =>
  a.type === "GotToCars";
export const goToCars = (): GotToCars => ({ type: "GotToCars" });
// endregion

// region GoToCats
export type GotToCats = Action<"GotToCats">;
export const isGotToCats = (a: Actions): a is GotToCats =>
  a.type === "GotToCats";
export const goToCats = (): GotToCats => ({ type: "GotToCats" });
// endregion

export type Actions = GotToHouses | GotToCars | GotToCats | InnerActions;

export type SwitchActions = GotToHouses | GotToCars | GotToCats;
export const isSwitchActions = (a: Actions): a is SwitchActions =>
  isGotToHouses(a) || isGotToCars(a) || isGotToCats(a);

export type InnerActions = ListingActions.Actions<Item>;
export const isInnerActions = ListingActions.isActions;
