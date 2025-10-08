// store/useUserStore.ts
import { EnumNextPlan } from "@/lib/constants/plan";
import { EnumRole } from "@/lib/constants/roles";
import { EnumNextStatus } from "@/lib/constants/status";
import { create } from "zustand";

export interface IUser {
  id: string;
  email: string;
  created_at: Date;
  updated_at?: Date | null;
  nickname?: string | null;
  role: EnumRole;
  status: EnumNextStatus | null;
  plan: EnumNextPlan;
}

interface UserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));
