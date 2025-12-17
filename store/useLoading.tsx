import { create } from "zustand";

type LoaderType = "" | "page" | "action" | "api";

interface LoadingState {
  type?: LoaderType;
  isLoading: boolean;
  setLoading: (loading: boolean, type?: LoaderType) => void;
}
export const useLoadingStore = create<LoadingState>((set) => ({
  type: "",
  isLoading: false,
  setLoading: (loading, type = "") => set({ type, isLoading: loading }),
}));
