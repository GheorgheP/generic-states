import { ReactElement } from "react";
import * as ListingState from "../States/Listing/types/State";
import { Content as Component } from "../components/Content";
import { Item } from "../Sdks/types/Item";

export type Props<T extends string> =
  | ListingState.Ready<T, Item>
  | ListingState.RemoveConfirmation<T, Item>
  | ListingState.Removing<T, Item>
  | ListingState.Searching<T, Item>;
export const Content = <T extends string>(props: Props<T>): ReactElement => (
  <Component items={props.items} onRemove={console.log} />
);
