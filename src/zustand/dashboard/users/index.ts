import { create } from "zustand";

interface UsersState {
  status: string;
  setStatus: (status: string) => void;
  plan: string;
  setPlan: (plan: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const useUsersStore = create<UsersState>((set) => ({
  status: "",
  setStatus: (status) => set({ status }),
  plan: "",
  setPlan: (plan) => set({ plan }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useUsersStore;
