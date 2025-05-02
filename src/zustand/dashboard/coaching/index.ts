import { create } from "zustand";

interface CoachingState {
  status: string;
  setStatus: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const useCoachingStore = create<CoachingState>((set) => ({
  status: "",
  setStatus: (status) => set({ status }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useCoachingStore;
