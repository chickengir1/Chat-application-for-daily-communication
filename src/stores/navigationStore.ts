import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NavigationState {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const useNavigationStore = create(
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
    }
  )
);
