import { createContext, ReactNode } from "react";
import { chatStore, Message, WS_CONFIG } from "@/stores/chatStore";
import { authStore } from "@/stores/authStore";
import { saveMessagesToDB } from "@/utils/IndexedDB";
import { v4 as uuidv4 } from "uuid";

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
      throw new Error("WebSocket 연결 실패 액세스 토큰이 없습니다.");
    }

    const url = new URL(`${WS_CONFIG.BASE_URL}${WS_CONFIG.PATH}/${roomId}`);
    url.searchParams.append("token", accessToken);

    const socket = new WebSocket(url.toString());

    socket.onopen = () => setConnected(roomId, true);

    const handlers = socketHandlers(roomId);
    socket.onmessage = (event) => handleMessage(roomId, event);
    socket.onerror = handlers.handleError;
    socket.onclose = handlers.handleClose;

    setSocket(roomId, socket);
    return socket;
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

  // 메시지 핸들러
  const handleMessage = async (roomId: string, event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.messageType === "UNREAD_COUNT" || data.messageType === "readby") {
      return;
    }

    const transformedMessage: Message = {
      ...data,
      id: uuidv4(),
      originFileUrl: data.originFileUrl || "",
      thumbnailUrl: data.thumbnailUrl || "",
    };

    addMessage(roomId, [transformedMessage]);
    await saveMessagesToDB(roomId, [transformedMessage]);
  };

  // 에러 핸들러
  const handleSocketError = (roomId: string, error: Event) => {
    console.error("WebSocket 에러", error, { cause: error });
    setConnected(roomId, false);
  };

  // 이벤트 핸들러
  const socketHandlers = (roomId: string) => ({
    handleError: (error: Event) => handleSocketError(roomId, error),
    handleClose: (e: CloseEvent) => {
      console.error(`Closed roomId=${roomId}, 코드:${e.code}`);
      leaveToRoom(roomId);
      setConnected(roomId, false);
      setTimeout(() => connect(roomId), WS_CONFIG.RECONNECT_TIMEOUT);
    },
  });

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
