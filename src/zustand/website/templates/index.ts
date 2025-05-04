import { create } from "zustand";

interface UsersState {
  category: string;
  setCategory: (status: string) => void;
  query: string;
  setQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

const useTemplateStore = create<UsersState>((set) => ({
  category: "",
  setCategory: (category) => set({ category }),

  query: "",
  setQuery: (query) => set({ query }),

  sortBy: "asc",
  setSortBy: (sortBy) => set({ sortBy }),
}));

export default useTemplateStore;
