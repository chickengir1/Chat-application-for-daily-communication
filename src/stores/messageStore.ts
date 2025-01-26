import { create } from "zustand";
import { saveMessagesToDB, loadMessagesFromDB } from "@/utils/IndexedDB";

export interface Message {
  messageType: string;
  sender: string;
  message: string;
  createdAt: string;
  roomid: string;
  originFileUrl?: string;
  thumbnailUrl?: string;
}

interface MessageState {
  messages: Record<string, Message[]>;
  filteredMessages: Message[];
  addMessage: (roomId: string, messages: Message[]) => void;
  filterMessages: (roomId: string) => void;
  loadMessages: (roomId: string) => Promise<void>;
}

export const messageStore = create<MessageState>((set) => ({
  messages: {},
  filteredMessages: [],

  addMessage: async (roomId, messages) => {
    await saveMessagesToDB(roomId, messages);
    set((state) => ({
      messages: {
        ...state.messages,
        [roomId]: [...(state.messages[roomId] || []), ...messages],
      },
    }));
  },

  filterMessages: (roomId) =>
    set((state) => ({
      filteredMessages: state.messages[roomId] || [],
    })),

  loadMessages: async (roomId) => {
    const messages = await loadMessagesFromDB(roomId);
    set((state) => ({
      messages: {
        ...state.messages,
        [roomId]: messages,
      },
    }));
  },
}));
