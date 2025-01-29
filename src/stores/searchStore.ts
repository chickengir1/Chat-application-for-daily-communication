import { create } from "zustand";

interface SearchState {
  query: string;
  isSearchActive: boolean;
  setQuery: (query: string) => void;
  setSearchActive: (isActive: boolean) => void;
  resetSearch: () => void;
}

export const searchStore = create<SearchState>((set) => ({
  query: "",
  isSearchActive: false,
  setQuery: (query) => set({ query }),
  setSearchActive: (isActive) =>
    set({
      isSearchActive: isActive,
      query: isActive ? undefined : "",
    }),
  resetSearch: () =>
    set({
      query: "",
      isSearchActive: false,
    }),
}));
