import { useContext, useEffect } from "react";
import { WebSocketContext } from "@/providers/webSocketProvider";
import { webSocketStore } from "@/stores/webSocketStore";

const useWebSocket = (roomId: string) => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket은 WebSocketProvider내에서 사용해야함.");
  }

  const { connect, disconnect, sendMessage } = context;
  const isConnected = webSocketStore((state) => state.isConnected[roomId]);
  const { disconnectAll } = webSocketStore();

  useEffect(() => {
    connect(roomId);
    // 컴포넌트가 언마운트되어도 연결 유지
    // 채팅방 전환 시에도 기존 연결이 유지되어야 하므로 cleanup 함수에서 disconnect하지 않음
  }, [roomId, connect]);

  return {
    isConnected,
    sendMessage: (data: string) => sendMessage(roomId, data),
    disconnect: () => disconnect(roomId),
    disconnectAll,
  };
};

export default useWebSocket;
