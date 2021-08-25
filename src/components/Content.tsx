import React from "react";

export interface Props<T> {
  items: Array<{ id: T; title: string; image: string }>;
  onRemove: (t: T) => void;
}

export function Content<T extends string | number>(props: Props<T>) {
  return (
    <ul>
      {props.items.map((i) => (
        <li key={i.id}>
          <div className="img">
            <img src={i.image} alt={i.image} />
          </div>
          <div className="title">{i.title}</div>
          <button className="remove" onClick={() => props.onRemove(i.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
