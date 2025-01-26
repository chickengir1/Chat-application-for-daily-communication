import { createContext, ReactNode } from "react";
import { chatStore, Message, WS_CONFIG } from "@/stores/chatStore";
import { authStore } from "@/stores/authStore";
import { saveMessagesToDB } from "@/utils/IndexedDB";

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const { addMessage, getSocket, setSocket, setConnected, leaveToRoom } =
    chatStore.getState();
  const { accessToken } = authStore.getState();

  // 웹소켓 에러 처리 및 상태 업데이트를 위한 공통 핸들러
  const handleSocketError = (roomId: string, error: Event) => {
    console.error("WebSocket 에러", error, { cause: error });
    setConnected(roomId, false);
  };

  const createSocketHandlers = (roomId: string) => ({
    handleMessage: async (event: MessageEvent) => {
      try {
        const parsedData: Message = JSON.parse(event.data);
        // TODO: 메시지 내용만 SHA-256으로 해시화
        // 1. message 필드만 해시화 (ID는 현재 방식 유지)
        // 2. 메시지 무결성 검증을 위해 원본 메시지와 해시값 함께 저장 (구현 가능하면 좋긴함 근데 어려울듯)
        // 3. 추후 메시지 복호화 시 해시값 비교하여 변조 여부 확인 (이것도 구현 가능하면 좋긴함;;)
        const transformedMessage = {
          ...parsedData,
          id: createMessageId(roomId),
          originFileUrl: parsedData.originFileUrl || "",
          thumbnailUrl: parsedData.thumbnailUrl || "",
        };

        await saveMessagesToDB(roomId, [transformedMessage]);
        addMessage(roomId, [transformedMessage]);
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

export interface WebSocketProviderValue {
  connect: (roomId: string) => WebSocket;
  sendMessage: (roomId: string, data: string) => void;
  disconnect: (roomId: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const WebSocketContext = createContext<WebSocketProviderValue | null>(
  null
);

const createMessageId = (() => {
  const counters: Record<string, number> = {};

  return (roomId: string) => {
    counters[roomId] = (counters[roomId] || 0) + 1;
    return `${roomId}-${Date.now()}-${counters[roomId]}`;
  };
})();
