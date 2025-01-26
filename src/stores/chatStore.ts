import { create } from "zustand";
import { loadMessagesFromDB } from "@/utils/IndexedDB";
import { MAX_MESSAGE_COUNT } from "@/utils/Constans";

export const WS_CONFIG = {
  BASE_URL: "ws://34.47.79.162:8080",
  PATH: "/api/chat",
  RECONNECT_TIMEOUT: 10000,
} as const;

export interface Message {
  id: string;
  messageType: string;
  sender: string;
  message: string;
  createdAt: string;
  roomid: string;
  originFileUrl?: string;
  thumbnailUrl?: string;
}

interface ChatStore {
  sockets: Record<string, WebSocket>;
  isConnected: Record<string, boolean>;
  messages: Record<string, Message[]>;
  filteredMessages: Message[];
  getSocket: (roomId: string) => WebSocket | null;
  setSocket: (roomId: string, socket: WebSocket) => void;
  leaveToRoom: (roomId: string) => void;
  setConnected: (roomId: string, status: boolean) => void;
  addMessage: (roomId: string, messages: Message[]) => void;
  filterMessages: (roomId: string) => void;
  loadMessages: (roomId: string) => Promise<void>;
}

const closeSocket = (socket: WebSocket) => {
  if (socket) {
    socket.close();
  }
};

export const chatStore = create<ChatStore>((set, get) => ({
  sockets: {},
  isConnected: {},
  messages: {},
  filteredMessages: [],

  getSocket: (roomId) => get().sockets[roomId] || null,

  setSocket: (roomId, socket) => {
    const currentSocket = get().sockets[roomId];
    closeSocket(currentSocket);
    const newSockets = { ...get().sockets };
    newSockets[roomId] = socket;
    set({ sockets: newSockets });
  },

  leaveToRoom: (roomId) => {
    const socket = get().sockets[roomId];
    closeSocket(socket);
    const newSockets = { ...get().sockets };
    delete newSockets[roomId];
    set({ sockets: newSockets });
  },

  setConnected: (roomId, status) => {
    const newIsConnected = { ...get().isConnected };
    newIsConnected[roomId] = status;
    set({ isConnected: newIsConnected });
  },

  addMessage: (roomId, messages) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [roomId]: [...(state.messages[roomId] || []), ...messages].slice(
          -MAX_MESSAGE_COUNT
        ),
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
