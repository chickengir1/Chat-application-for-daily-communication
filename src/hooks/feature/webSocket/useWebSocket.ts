import { useContext, useEffect } from "react";
import { WebSocketContext } from "@/providers/webSocketProvider";
import { chatStore } from "@/stores/chatStore";

const useWebSocket = (roomId: string) => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket은 WebSocketProvider내에서 사용해야함.");
  }
  const { connect, disconnect, sendMessage } = context;
  const { loadMessages } = chatStore.getState();

  useEffect(() => {
    connect(roomId);
    loadMessages(roomId);
  }, [roomId, connect, disconnect, loadMessages]);

  return {
    sendMessage: (data: string) => sendMessage(roomId, data),
    disconnect: () => disconnect(roomId),
  };
};

export default useWebSocket;
