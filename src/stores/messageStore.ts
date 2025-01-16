import { create } from "zustand";
import { chatData } from "@/utils/stub";

interface Message {
  userId: number;
  sender: string;
  message: string;
  createdAt: string;
  roomid: number;
}

interface MessageState {
  messages: Message[];
  filteredMessages: Message[];
  filterMessages: (roomId: number) => void;
  addMessage: (message: Message) => void;
}

export const messageStore = create<MessageState>((set) => ({
  messages: chatData.map((message) => ({
    ...message,
    id: message.roomid,
  })),
  filteredMessages: chatData.map((message) => ({
    ...message,
    id: message.roomid,
  })),
  filterMessages: (id) =>
    set((state) => ({
      filteredMessages: state.messages.filter(
        (message) => message.roomid === id
      ),
    })),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
      filteredMessages: [...state.filteredMessages, message],
    })),
}));
