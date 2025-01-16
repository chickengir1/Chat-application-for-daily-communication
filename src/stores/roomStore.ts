import { create } from "zustand";

interface RoomState {
  chatId: number | null;
  title: string;
  subtitle: string;
  setRoom: (chatId: number, title: string, subtitle: string) => void;
}

export const roomStore = create<RoomState>((set) => ({
  chatId: null,
  title: "",
  subtitle: "",
  setRoom: (chatId, title, subtitle) =>
    set(() => ({ chatId, title, subtitle })),
}));
