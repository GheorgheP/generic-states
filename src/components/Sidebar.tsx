import React from "react";

export interface Props<T> {
  items: Array<{ id: T; title: string }>;
  onClick: (t: T) => void;
}

export function Sidebar<T extends string | number>(props: Props<T>) {
  return (
    <ul>
      {props.items.map((i) => (
        <li key={i.id} onClick={() => props.onClick(i.id)}>
          {i.title}
        </li>
      ))}
    </ul>
  );
}
