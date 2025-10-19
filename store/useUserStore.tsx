// stores/useUserStore.ts
import { typeUsers } from "@/app/actions/getUser";
import { create } from "zustand";

type UserStore = {
  getUser: typeUsers | null;
  setUser: (user: typeUsers) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  getUser: null,
  setUser: (user) => set({ getUser: user }),
  clearUser: () => set({ getUser: null }),
}));
