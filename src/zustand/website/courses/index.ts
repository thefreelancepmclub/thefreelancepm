import { create } from "zustand";

interface UsersState {
  level: string;
  setlevel: (level: string) => void;
  type: string;
  setType: (plan: string) => void;
  query: string;
  setQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

const useCoursesStore = create<UsersState>((set) => ({
  level: "",
  setlevel: (level) => set({ level }),
  type: "",
  setType: (data) => set({ type: data }),
  query: "",
  setQuery: (query) => set({ query }),
  sortBy: "asc",
  setSortBy: (sortBy) => set({ sortBy }),
}));

export default useCoursesStore;
