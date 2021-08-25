import { Component, createElement, FC, ReactElement, useCallback } from "react";
import { Sidebar } from "../components/Sidebar";
import { useDispatch } from "react-redux";
import {
  Actions,
  goToCars,
  goToCats,
  goToHouses,
} from "../store/types/Actions";
import * as State from "../store/types/State";
import * as ListingState from "../States/Listing/types/State";
import { match } from "fp-utilities";
import { always } from "ramda";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

const items: Array<{ id: "houses" | "cars" | "cats"; title: string }> = [
  { id: "houses", title: "Houses" },
  { id: "cars", title: "Cars" },
  { id: "cats", title: "Cats" },
];

export const createContainerContainer = <T extends string>(t: T) =>
  match(
    [ListingState.isLoading(t), always(createElement(Loading))],
    [ListingState.isLoadError(t), always(createElement(Error))],
    [ListingState.isReady(t), always(createElement(Error))],
    [ListingState.isSearching(t), always(createElement(Error))],
    [ListingState.isRemoveConfirmation(t), always(createElement(Error))],
    [ListingState.isRemoving(t), always(createElement(Error))]
  );

const t = createContainerContainer("Houses");

const container: FC<State.State> = match(
  [State.isHouses, createContainerContainer("Houses")],
  [State.isCars, createContainerContainer("Cars")],
  [State.isCats, createContainerContainer("Cats")]
);

export const Main = (state: State.State): ReactElement => {
  const dispatch = useDispatch();
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
