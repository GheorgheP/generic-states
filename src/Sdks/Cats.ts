import { Sdk } from "../States/Listing/observable";
import { Item } from "./types/Item";

let items: Item[] = [
  {
    id: 1,
    title: "First item",
    image: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
  },
  {
    id: 2,
    title: "Second item",
    image:
      "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/is_my_cat_normal_slideshow/1800x1200_is_my_cat_normal_slideshow.jpg",
  },
  {
    id: 3,
    title: "Third item",
    image: "https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg",
  },
  {
    id: 4,
    title: "Forth item",
    image: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg",
  },
  {
    id: 5,
    title: "Fifth item",
    image: "https://cdn.britannica.com/39/7139-050-A88818BB/Himalayan-chocolate-point.jpg",
  },
];

export const Cats: Sdk<Item> = {
  getItems: (s) => new Promise((r) => setTimeout(() => r(s ? items.filter((i) => i.title.includes(s)) : items), 3000)),
  remove: (id) => {
    items = items.filter((i) => i.id !== id);

    return new Promise((r) => {
      setTimeout(() => r(items), 2000);
    });
  },
};
