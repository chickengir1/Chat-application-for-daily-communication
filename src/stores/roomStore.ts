import { create } from "zustand";

interface RoomState {
  chatId: string;
  title: string;
  subtitle: string;
  participants: string[];
  setRoom: (
    chatId: string,
    title: string,
    subtitle: string,
    participants: string[]
  ) => void;
}

export const roomStore = create<RoomState>((set) => ({
  chatId: "",
  title: "",
  subtitle: "",
  participants: [],
  setRoom: (chatId, title, subtitle, participants) =>
    set(() => ({ chatId, title, subtitle, participants })),
}));
