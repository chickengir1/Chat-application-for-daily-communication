import { create } from "zustand";

export const WS_CONFIG = {
  BASE_URL: "ws://34.47.79.162:8080",
  PATH: "/api/chat",
  RECONNECT_TIMEOUT: 10000,
} as const;

interface WebSocketStore {
  sockets: Record<string, WebSocket>;
  isConnected: Record<string, boolean>;
  getSocket: (roomId: string) => WebSocket | null;
  setSocket: (roomId: string, socket: WebSocket) => void;
  leaveToRoom: (roomId: string) => void;
  setConnected: (roomId: string, status: boolean) => void;
  disconnectAll: () => void;
}

const closeSocket = (socket: WebSocket) => {
  if (socket) {
    socket.close();
  }
};

export const webSocketStore = create<WebSocketStore>((set, get) => ({
  sockets: {},
  isConnected: {},

  getSocket: (roomId) => get().sockets[roomId] || null,

  setSocket: (roomId, socket) => {
    const currentSocket = get().sockets[roomId];
    closeSocket(currentSocket); // 기존 소켓 닫기
    const newSockets = { ...get().sockets };
    newSockets[roomId] = socket; // 새로운 소켓 설정
    set({ sockets: newSockets });
  },

  leaveToRoom: (roomId) => {
    const socket = get().sockets[roomId];
    closeSocket(socket); // 소켓 닫기
    const newSockets = { ...get().sockets };
    delete newSockets[roomId]; // 소켓 제거
    set({ sockets: newSockets });
  },

  // roomId의 연결 상태 설정
  setConnected: (roomId, status) => {
    const newIsConnected = { ...get().isConnected };
    newIsConnected[roomId] = status; // 연결 상태 설정
    set({ isConnected: newIsConnected });
  },

  disconnectAll: () => {
    const { sockets } = get();
    for (const socket of Object.values(sockets)) {
      closeSocket(socket); // 모든 소켓 닫기
    }
    set({ sockets: {}, isConnected: {} });
  },
}));
