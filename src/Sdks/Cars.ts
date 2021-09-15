import { Sdk } from "../States/Listing/observable";
import { Item } from "../States/Listing/types/Item";

let items: Item[] = [
  {
    id: 1,
    title: "First item",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4lVEefmG0mNnBkwmb07QVY0OkVLcNAXytAPNoyESxlP2vnQoUNdAIhBHxbeBQ6dgEcEU&usqp=CAU",
  },
  {
    id: 2,
    title: "Second item",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRegu6TChc4r1EE78BBj40XnbX652Jre0MxYSeq7SlqUt52jjI4DC_fvznXIW0U0f47wxI&usqp=CAU",
  },
  {
    id: 3,
    title: "Third item",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvDZ0B6AvPk2NbPG8LvgpYZvaFQVQ0S3zpItwaScuKw8wG25ZZYkRUmQA3gLOL9_56KzA&usqp=CAU",
  },
  {
    id: 4,
    title: "Forth item",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT98FmndJW6nLQgxVRGsctrmFb50alUiIniRKsB62DwM9jmVP4yiQ2PQCSwexeWklq-Rts&usqp=CAU",
  },
  {
    id: 5,
    title: "Fifth item",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKsI6YC4I9bh8fFBfVofSfzhomUZoh2old-C6lvm9GRmOO0K9JmEV9JBQHLN8hzTnvnaA&usqp=CAU",
  },
];

export const Cars: Sdk = {
  getItems: (s) =>
    new Promise((r) =>
      setTimeout(
        () => r(s ? items.filter((i) => i.title.includes(s)) : items),
        3000
      )
    ),
  remove: (id) => {
    items = items.filter((i) => i.id !== id);

    return new Promise((r) => {
      setTimeout(() => r(items), 2000);
    });
  },
};
