import { useContext, useEffect, useState, useCallback } from "react";
import { WebSocketContext } from "@/providers/webSocketProvider";
import { webSocketStore } from "@/stores/webSocketStore";
import { Message } from "@/stores/messageStore";
import { saveMessagesToDB } from "@/utils/IndexedDB";

interface RoomMessages {
  roomId: string;
  messages: Message[];
}

const transformMessages = (message: Message): Message => {
  return {
    ...message,
    originFileUrl: message.originFileUrl || "",
    thumbnailUrl: message.thumbnailUrl || "",
  };
};

const useWebSocketUtils = (roomId: string) => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket은 WebSocketProvider내에서 사용해야함.");
  }

  const { connect, disconnect, sendMessage } = context;

  return {
    connect: () => connect(roomId),
    disconnect: () => disconnect(roomId),
    sendMessage: (data: string) => sendMessage(roomId, data),
  };
};

const useWebSocket = (roomId: string) => {
  const [roomMessages, setRoomMessages] = useState<RoomMessages[]>([]);
  const { connect, disconnect, sendMessage } = useWebSocketUtils(roomId);

  const updateRoomMessages = useCallback((message: Message) => {
    setRoomMessages((prev) => {
      const roomIndex = prev.findIndex(
        (room) => room.roomId === message.roomid
      );

      if (roomIndex === -1) {
        const newRoom = {
          roomId: message.roomid,
          messages: [message],
        };
        return [...prev, newRoom];
      }
      const updatedRooms = [...prev];
      updatedRooms[roomIndex].messages.push(message);
      return updatedRooms;
    });
  }, []);

  const handleMessage = useCallback(
    async (event: MessageEvent) => {
      const receivedMessage: Message = JSON.parse(event.data);
      const transformedMessage = transformMessages(receivedMessage);

      await saveMessagesToDB(roomId, [transformedMessage]);

      updateRoomMessages(transformedMessage);
    },
    [roomId, updateRoomMessages]
  );

  useEffect(() => {
    connect();
    const socket = webSocketStore.getState().getSocket(roomId);
    if (!socket) return;

    socket.addEventListener("message", handleMessage);

    // 컴포넌트 언마운트 시 채팅방 연결 유지
    return () => {};
  }, [roomId, connect, handleMessage]);

  return {
    sendMessage,
    disconnect,
    roomMessages,
  };
};

export default useWebSocket;
