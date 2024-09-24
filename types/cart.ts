export type TCart = {
  id: number;
  name: string;
  description: string;
  price: string;
  displayImage: string | null;
  qty: number;
};

export type TCartWithoutQty = Omit<TCart, "qty">;

export type TCartState = {
  cart: TCart[];
  addToCart: (service: TCartWithoutQty) => void;
  removeFromCart: (id: number) => void;
  incrementQty: (id: number) => void;
  decrementQty: (id: number) => void;
  clearCart: () => void;
};