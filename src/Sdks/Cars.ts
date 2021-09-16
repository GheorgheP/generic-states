import { Sdk } from "../States/Listing/observable";
import { Item } from "./types/Item";

let items: Item[] = [
  {
    id: 1,
    title: "Tesla model S",
    image:
      "https://tesla-cdn.thron.com/delivery/public/image/tesla/195458a0-ff67-488c-b972-14d23d2c42fb/bvlatuR/std/1200x630/ms-homepage-social",
  },
  {
    id: 2,
    title: "BMW x5",
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-bmw-x5-black-vermilion-edition-101-1625852653.jpg?crop=0.998xw:0.750xh;0.00160xw,0.135xh&resize=1200:*",
  },
  {
    id: 3,
    title: "Skoda superb",
    image: "https://cdn.motor1.com/images/mgl/LOPmW/s1/4x3/2020-skoda-superb-facelift.webp",
  },
  {
    id: 4,
    title: "Audi e-tron",
    image: "https://ev-database.org/img/auto/Audi_e-tron_Sportback_2020/Audi_e-tron_Sportback_2020-01.jpg",
  },
  {
    id: 5,
    title: "Polstar",
    image: "https://i.pinimg.com/originals/3b/7d/61/3b7d61c224c07337f7d7bb6c600d0bff.jpg",
  },
];

export const Cars: Sdk<Item> = {
  getItems: (s) => new Promise((r) => setTimeout(() => r(s ? items.filter((i) => i.title.includes(s)) : items), 3000)),
  remove: (id) => {
    items = items.filter((i) => i.id !== id);

    return new Promise((r) => {
      setTimeout(() => r(items), 2000);
    });
  },
};
