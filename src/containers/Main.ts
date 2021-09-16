import { createElement, FC, ReactElement, useCallback } from "react";
import { TopBar, Props as TopBarProps } from "../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { Actions, goToCars, goToCats, goToHouses } from "../store/types/Actions";
import * as State from "../store/types/State";
import * as Listing from "../States/Listing/types/State";
import { match } from "fp-utilities";
import { always } from "ramda";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Content } from "./Content";
import { Item } from "../Sdks/types/Item";

type Tab = "houses" | "cars" | "cats";
const items: Array<{ id: Tab; title: string }> = [
  { id: "houses", title: "Houses" },
  { id: "cars", title: "Cars" },
  { id: "cats", title: "Cats" },
];

export const createContainer = <T extends string>(t: T): ((s: Listing.Listing<T, Item>) => ReactElement) =>
  match(
    [Listing.isLoading(t), always(createElement(Loading))],
    [Listing.isLoadError(t), always(createElement(Error))],
    [Listing.isReady<T, Item>(t), (s) => createElement(Content, s)],
    [Listing.isSearching<T, Item>(t), (s) => createElement(Content, s)],
    [Listing.isRemoveConfirmation<T, Item>(t), (s) => createElement(Content, s)],
    [Listing.isRemoving<T, Item>(t), (s) => createElement(Content, s)],
  );

const container: FC<State.State> = match(
  [State.isHouses, createContainer("Houses")],
  [State.isCars, createContainer("Cars")],
  [State.isCats, createContainer("Cats")],
);

const getTab: (s: State.State) => Tab = match(
  [State.isHouses, always("houses")],
  [State.isCars, always("cars")],
  [State.isCats, always("cats")],
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
    [dispatch],
  );

  return createElement("div", { className: "container" }, [
    createElement<TopBarProps<Tab>>(TopBar, {
      items,
      onClick: onClick,
      active: getTab(state),
    }),
    createElement(container, state),
  ]);
};
