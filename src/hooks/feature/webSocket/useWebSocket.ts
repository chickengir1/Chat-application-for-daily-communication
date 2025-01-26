import { useContext, useEffect } from "react";
import { WebSocketContext } from "@/providers/webSocketProvider";

const useWebSocket = (roomId: string) => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket은 WebSocketProvider내에서 사용해야함.");
  }
  const { connect, disconnect, sendMessage } = context;

  // 원래 클린업 안줄려고 했는데 채팅방 전환 시간이 오래 되었을땐 필요할 것 같아서 추가함
  // 타임 아웃은 5분 입니다.
  useEffect(() => {
    connect(roomId);

    return () => {
      setTimeout(
        () => {
          disconnect(roomId);
        },
        1000 * 60 * 5
      );
    };
  }, [roomId, connect, disconnect]);

  return {
    sendMessage: (data: string) => sendMessage(roomId, data),
    disconnect: () => disconnect(roomId),
  };
};

export default useWebSocket;
