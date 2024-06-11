import { initStore } from "./useStore";

export function configureStore() {
  const actions = {
    TOGGLE_FAV: (cur, productId) => {
      const prodIndex = cur.products.findIndex((p) => p.id === productId);
      const newFavStatus = !cur.products[prodIndex].isFavorite;
      const updatedProducts = [...cur.products];
      updatedProducts[prodIndex] = {
        ...cur.products[prodIndex],
        isFavorite: newFavStatus,
      };
      return { products: updatedProducts };
    },
  };
  initStore(actions, {
    products: [
      {
        id: "p1",
        title: "Red Scarf",
        description: "A pretty red scarf.",
        isFavorite: false,
      },
      {
        id: "p2",
        title: "Blue T-Shirt",
        description: "A pretty blue t-shirt.",
        isFavorite: false,
      },
      {
        id: "p3",
        title: "Green Trousers",
        description: "A pair of lightly green trousers.",
        isFavorite: false,
      },
      {
        id: "p4",
        title: "Orange Hat",
        description: "Street style! An orange hat.",
        isFavorite: false,
      },
    ],
  });
}
