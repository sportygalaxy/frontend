import { TCart, TCartState, TCartWithoutQty } from "@/types/cart";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create<TCartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (service: TCartWithoutQty, isSubmit?: boolean) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === service.id
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === service.id
                  ? {
                      ...item,
                      color: item.colors,
                      ...(!!isSubmit ? { qty: item.qty } : { qty: item.qty + 1 }),
                    }
                  : item
              ),
            };
          } else {
            return {
              cart: [
                ...state.cart,
                {
                  ...service,
                  colors: service.colors,
                  sizes: service.sizes,
                  qty: service.qty,
                },
              ],
            };
          }
        });
      },
      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },
      incrementQty: (id) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  qty: item.qty + 1,
                  variant: {
                    ...item.variant, // preserve other variant properties
                    qty: item.qty + 1, // update variant qty to match cart qty
                  },
                }
              : item
          ),
        }));
      },
      decrementQty: (id) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id && item.qty > 1
              ? {
                  ...item,
                  qty: item.qty - 1,
                  variant: {
                    ...item.variant, // preserve other variant properties
                    qty: item.qty - 1, // update variant qty to match cart qty
                  },
                }
              : item
          ),
        }));
      },
      clearCart: () => {
        set(() => ({
          cart: [],
        }));
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
