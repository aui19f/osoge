// stores/useUserStore.ts
import { typeUsers } from "@/app/actions/getUser";
import { create } from "zustand";

type UserStore = {
  user: typeUsers | null;
  setUser: (user: typeUsers) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
  clearUser: () => set({ user: null }),
}));
