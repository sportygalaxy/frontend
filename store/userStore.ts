import { TUserState } from "@/types/user";
import { create } from "zustand";
import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create<TUserState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
