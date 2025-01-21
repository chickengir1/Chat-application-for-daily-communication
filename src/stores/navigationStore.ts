import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NavigationState {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const initialState = {
  activeIndex: 0,
};

export const navigationStore = create(
  persist<NavigationState>(
    (set) => ({
      ...initialState,
      setActiveIndex: (index) => set({ activeIndex: index }),
    }),
    {
      name: "navigation-storage",
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : initialState;
        },
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
