import { createContext, ReactNode } from "react";
import { chatStore, WS_CONFIG } from "@/stores/chatStore";
import { authStore } from "@/stores/authStore";
import { saveMessagesToDB } from "@/utils/IndexedDB";

interface WebSocketProviderProps {
  children: ReactNode;
}

export interface WebSocketProviderValue {
  connect: (roomId: string) => WebSocket;
  sendMessage: (roomId: string, data: string) => void;
  disconnect: (roomId: string) => void;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const { addMessage, getSocket, setSocket, setConnected, leaveToRoom } =
    chatStore.getState();

  // 커넥터
  const connect = (roomId: string): WebSocket => {
    const existingSocket = getSocket(roomId);
    if (existingSocket) return existingSocket;

    const { accessToken } = authStore.getState();
    if (!accessToken) {
      console.error("WebSocket 연결 실패 액세스 토큰이 없습니다.");
    }

    const url = new URL(`${WS_CONFIG.BASE_URL}${WS_CONFIG.PATH}/${roomId}`);
    url.searchParams.append("token", accessToken);

    const socket = new WebSocket(url.toString());

    socket.onopen = () => setConnected(roomId, true);

    const handlers = createSocketHandlers(roomId);
    socket.onmessage = handlers.handleMessage;
    socket.onerror = handlers.handleError;
    socket.onclose = handlers.handleClose;

    setSocket(roomId, socket);
    return socket;
  };

  // 메시지 전송 핸들러
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

  // 디스커넥터
  const disconnect = (roomId: string) => {
    const socket = getSocket(roomId);
    if (socket) {
      socket.close();
      leaveToRoom(roomId);
    } else {
      console.error(`이미 roomId=${roomId} 소켓이 없거나 닫힘`);
    }
  };

  // 이벤트 핸들러
  const createSocketHandlers = (roomId: string) => ({
    handleMessage: async (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.messageType === "UNREAD_COUNT" || data.type === "readby") {
          return;
        }

        const transformedMessage = {
          ...data,
          id: createMessageId(roomId),
          originFileUrl: data.originFileUrl || "",
          thumbnailUrl: data.thumbnailUrl || "",
        };

        // 먼저 프론트 상태 업데이트
        addMessage(roomId, [transformedMessage]);

        // 그 다음 DB 저장
        try {
          await saveMessagesToDB(roomId, [transformedMessage]);
        } catch (error) {
          console.error("메시지 DB 저장 중 오류:", error);
        }
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
      setTimeout(() => connect(roomId), WS_CONFIG.RECONNECT_TIMEOUT);
    },
  });

  // 에러 핸들러
  const handleSocketError = (roomId: string, error: Event) => {
    console.error("WebSocket 에러", error, { cause: error });
    setConnected(roomId, false);
  };

  return (
    <WebSocketContext.Provider value={{ connect, sendMessage, disconnect }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const WebSocketContext = createContext<WebSocketProviderValue | null>(
  null
);

// 메세지 아이디 생성 유틸
const createMessageId = (() => {
  const counters: Record<string, number> = {};
  return (roomId: string) => {
    counters[roomId] = (counters[roomId] || 0) + 1;
    return `${roomId}-${Date.now()}-${counters[roomId]}`;
  };
})();
