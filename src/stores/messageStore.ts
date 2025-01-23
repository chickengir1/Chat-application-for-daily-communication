import { create } from "zustand";

export interface Message {
  messageType: string;
  nickname: string;
  message: string;
  createdAt: string;
  roomid: string;
  originFileUrl?: string;
  thumbnailUrl?: string;
}

interface MessageState {
  messages: Message[];
  filteredMessages: Message[];
  filterMessages: (roomId: string) => void;
  addMessage: (message: Message) => void;
}

export const messageStore = create<MessageState>((set) => ({
  messages: [],
  filteredMessages: [],

  filterMessages: (roomId: string) =>
    set((state) => ({
      filteredMessages: state.messages.filter((msg) => msg.roomid === roomId),
    })),

  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
      filteredMessages: [...state.filteredMessages, message],
    })),
}));
