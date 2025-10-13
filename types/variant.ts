export type TVariant = {
  id: number;
  name: string;
  sizes: string;
  colors: string;
  description: string;
  price: string;
  displayImage: string | null;
  qty: number;
};

export type TVariantWithoutQty = TVariant;
// export type TVariantWithoutQty = Omit<TVariant, "qty">;

export type TVariantState = {
  variant: TVariant[];
  addToVariant: (service: TVariantWithoutQty) => void;
  removeFromVariant: (id: number) => void;
  incrementQty: (id: number) => void;
  decrementQty: (id: number) => void;
  clearVariant: () => void;
};