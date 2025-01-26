import { createContext, ReactNode } from "react";
import { Message, messageStore } from "@/stores/messageStore";
import { webSocketStore } from "@/stores/webSocketStore";
import { WS_CONFIG } from "@/stores/webSocketStore";
import { authStore } from "@/stores/authStore";

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const { addMessage } = messageStore.getState();
  const { accessToken } = authStore.getState();
  const { getSocket, setSocket, setConnected, leaveToRoom } = webSocketStore();

  // 웹소켓 에러 처리 및 상태 업데이트를 위한 공통 핸들러
  const handleSocketError = (roomId: string, error: Event) => {
    console.error("WebSocket 에러", error, { cause: error });
    setConnected(roomId, false);
  };

  const createSocketHandlers = (roomId: string) => ({
    handleMessage: (event: MessageEvent) => {
      try {
        const parsedData: Message = JSON.parse(event.data);
        addMessage(roomId, [parsedData]);
      } catch (error) {
        console.error("메시지 파싱 에러", error);
      }
    },
    handleError: (error: Event) => handleSocketError(roomId, error),
    handleClose: (e: CloseEvent) => {
      console.error(
        `WebSocket onclose roomId=${roomId}, 코드:${e.code}, 원인:${e.reason}`
      );
      leaveToRoom(roomId);
      setConnected(roomId, false);
      // 자동 재연결 시도
      // 채팅방 이동 시에도 연결 유지를 위한 reconnect 로직 추가
      setTimeout(() => connect(roomId), WS_CONFIG.RECONNECT_TIMEOUT);
    },
  });

  const connect = (roomId: string): WebSocket => {
    // 중복 연결 방지용
    const existingSocket = getSocket(roomId);
    if (existingSocket) return existingSocket;

    const url = `${WS_CONFIG.BASE_URL}${WS_CONFIG.PATH}/${roomId}?token=${accessToken}`;
    const socket = new WebSocket(url);

    // 연결 성공 시 상태 업데이트
    socket.onopen = () => setConnected(roomId, true);

    const handlers = createSocketHandlers(roomId);
    socket.onmessage = handlers.handleMessage;
    socket.onerror = handlers.handleError;
    socket.onclose = handlers.handleClose;

    setSocket(roomId, socket);
    return socket;
  };

  const sendMessage = (roomId: string, data: string) => {
    const socket = getSocket(roomId);
    if (!socket) {
      console.warn(`roomId=${roomId}에 대한 소켓 서버가 없습니다.`);
      return;
    }
    if (socket.readyState !== WebSocket.OPEN) {
      console.warn(`소켓이 닫혀있습니다. readyState=${socket.readyState}`);
      return;
    }
    socket.send(data);
  };

  const disconnect = (roomId: string) => {
    const socket = getSocket(roomId);
    if (socket) {
      console.log(`disconnect roomId=${roomId}`);
      socket.close();
      leaveToRoom(roomId);
    } else {
      console.error(`이미 roomId=${roomId} 소켓이 없거나 닫힘`);
    }
  };

  return (
    <WebSocketContext.Provider value={{ connect, sendMessage, disconnect }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// WebSocketProvider에서 제공하는 값의 타입
export interface WebSocketProviderValue {
  connect: (roomId: string) => WebSocket;
  sendMessage: (roomId: string, data: string) => void;
  disconnect: (roomId: string) => void;
}

// Context 생성용
// eslint-disable-next-line react-refresh/only-export-components
export const WebSocketContext = createContext<WebSocketProviderValue | null>(
  null
);
