export type TCart = {
  id: number;
  name: string;
  sizes: string;
  colors: string;
  weights: string;
  dimensions: string;
  description: string;
  price: string;
  displayImage: string | null;
  qty: number;
  variant: any;
  paymentSplitValue: number;
  amountToPay: number;
};

export type TCartWithoutQty = TCart;
// export type TCartWithoutQty = Omit<TCart, "qty">;

export type TCartState = {
  cart: TCart[];
  addToCart: (service: TCartWithoutQty, submit?: boolean) => void;
  removeFromCart: (id: number) => void;
  incrementQty: (id: number) => void;
  decrementQty: (id: number) => void;
  clearCart: () => void;
};
