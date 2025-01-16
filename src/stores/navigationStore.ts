import { create } from "zustand";
import { persist } from "zustand/middleware";
interface NavigationState {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const navigationStore = create(
  persist<NavigationState>(
    (set) => ({
      activeIndex: 0,
      setActiveIndex: (index) =>
        set(() => ({
          activeIndex: index,
        })),
    }),
    {
      name: "navigation-storage",
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          if (item) return JSON.parse(item);
          if (!item) return { activeIndex: 0 };
        },
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
