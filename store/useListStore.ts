import { ItemOfInitialgetList } from "@/app/actions/getList";
import { create } from "zustand";

interface ListState {
  items: ItemOfInitialgetList[];
  page: number;
  hasMore: boolean;
  scrollY: number;
  setItems: (items: ItemOfInitialgetList[]) => void;
  addItems: (items: ItemOfInitialgetList[]) => void;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setScrollY: (y: number) => void;
}

export const useListStore = create<ListState>((set) => ({
  items: [],
  page: 0,
  hasMore: true,
  scrollY: 0,
  setItems: (items) => set({ items }),
  addItems: (items) => set((state) => ({ items: [...state.items, ...items] })),
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),
  setScrollY: (y) => set({ scrollY: y }),
}));
