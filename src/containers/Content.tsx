import { ReactElement } from "react";
import * as ListingState from "../States/Listing/types/State";
import { Content as Component } from "../components/Content";

export type Props<T extends string> =
  | ListingState.Ready<T>
  | ListingState.RemoveConfirmation<T>
  | ListingState.Removing<T>
  | ListingState.Searching<T>;
export const Content = <T extends string>(props: Props<T>): ReactElement => (
  <Component items={props.items} onRemove={console.log} />
);
