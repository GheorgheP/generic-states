import { createElement, FC, ReactElement, useCallback } from "react";
import { Sidebar } from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  Actions,
  goToCars,
  goToCats,
  goToHouses,
} from "../store/types/Actions";
import * as State from "../store/types/State";
import * as Listing from "../States/Listing/types/State";
import { match } from "fp-utilities";
import { always } from "ramda";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Content } from "./Content";

const items: Array<{ id: "houses" | "cars" | "cats"; title: string }> = [
  { id: "houses", title: "Houses" },
  { id: "cars", title: "Cars" },
  { id: "cats", title: "Cats" },
];

export const createContainer = <T extends string>(
  t: T
): ((s: Listing.Listing<T>) => ReactElement) =>
  match(
    [Listing.isLoading(t), always(createElement(Loading))],
    [Listing.isLoadError(t), always(createElement(Error))],
    [Listing.isReady<T>(t), (s) => createElement(Content, s)],
    [Listing.isSearching<T>(t), (s) => createElement(Content, s)],
    [Listing.isRemoveConfirmation<T>(t), (s) => createElement(Content, s)],
    [Listing.isRemoving<T>(t), (s) => createElement(Content, s)]
  );

const container: FC<State.State> = match(
  [State.isHouses, createContainer("Houses")],
  [State.isCars, createContainer("Cars")],
  [State.isCats, createContainer("Cats")]
);

export const Main = (): ReactElement => {
  const dispatch = useDispatch();
  const state = useSelector<State.State, State.State>((s) => s);
  const onClick = useCallback(
    (v: "houses" | "cars" | "cats"): Actions => {
      switch (v) {
        case "houses":
          return dispatch(goToHouses());
        case "cars":
          return dispatch(goToCars());
        case "cats":
          return dispatch(goToCats());
      }
    },
    [dispatch]
  );

  return createElement("div", { className: "container" }, [
    // @ts-ignore
    createElement(Sidebar, { items, onClick: onClick }),
    createElement(container, state),
  ]);
};
