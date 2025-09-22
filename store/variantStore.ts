import { TVariant, TVariantState, TVariantWithoutQty } from "@/types/variant";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useVariantStore = create<TVariantState>()(
  persist(
    (set) => ({
      variant: [],
      addToVariant: (service: TVariantWithoutQty) => {
        set((state) => {
          const existingItem = state.variant.find(
            (item) => item.id === service.id
          );

          if (existingItem) {
            return {
              variant: state.variant.map((item) =>
                item.id === service.id
                  ? { ...item, color: item.colors, qty: item.qty + 1 }
                  : item
              ),
            };
          } else {
            return {
              variant: [
                ...state.variant,
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
      removeFromVariant: (id) => {
        set((state) => ({
          variant: state.variant.filter((item) => item.id !== id),
        }));
      },
      incrementQty: (id) => {
        set((state) => ({
          variant: state.variant.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
          ),
        }));
      },
      decrementQty: (id) => {
        set((state) => ({
          variant: state.variant.map((item) =>
            item.id === id && item.qty > 1
              ? { ...item, qty: item.qty - 1 }
              : item
          ),
        }));
      },
      clearVariant: () => {
        set(() => ({
          variant: [],
        }));
      },
    }),
    {
      name: "variant-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useVariantStore;
