import { createElement, ReactElement, useCallback } from "react";
import { Sidebar } from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { Types } from "../States/Listing/types/Actions";

const items: [
  { id: "houses"; title: "Houses" },
  { id: "cars"; title: "Cars" },
  { id: "cats"; title: "Cats" }
];

export const Main = (): ReactElement => {
  const dispatch = useDispatch();
  const onClick = useCallback((v: string) => {
    switch (v) {
      case "houses":
        return dispatch({ type: "GoToHouses" });
    }
  });

  return createElement("div", { className: "container" }, [
    createElement(Sidebar, { items, onClick }),
  ]);
};
