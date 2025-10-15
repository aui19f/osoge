// store/useUserStore.ts
import { typeUsers } from "@/app/actions/getUser";
import { create } from "zustand";

interface UserStore {
  user: typeUsers | null;
  setUser: (user: typeUsers) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));
