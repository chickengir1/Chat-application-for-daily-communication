import { Message, messageStore } from "@/stores/messageStore";
const wsCache: Record<string, WebSocket> = {};

// dev용 유저 토큰
// eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZXIxMDAwMUBleGFtcGxlLmNvbSIsImlhdCI6MTczNzY5OTg3OCwiZXhwIjoxNzM3NzAzNDc4fQ.DEufSh8C-dWTD2YuycJP7QA0IPydxlqEiT64ywdIVs7w9BT68fEzi7kT0xvulEChzhaMejQ7bw9_eOw8LGs23w

const useWebSocket = (baseUrl: string) => {
  const { addMessage } = messageStore.getState();

  const connect = (roomId: string) => {
    if (wsCache[roomId]) {
      return wsCache[roomId];
    }

    const url = `${baseUrl}/chat/${encodeURIComponent(roomId)}?token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZXIxMDAxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM3NzAxNDU0LCJleHAiOjE3Mzc3MDUwNTR9.Z2N4Hp8rATGMTv5BjiYVra1b5yNCnENnjgEOEcjKFKEvyyiQ-0wBgyvPspuXYmbgTFb3uizbWveHfJKTfAia9Q`;
    const socket = new WebSocket(url);
    wsCache[roomId] = socket; // 캐시에 저장

    socket.onmessage = (event) => {
      try {
        const parsedData: Message = JSON.parse(event.data);
        addMessage(parsedData);
      } catch (error) {
        console.error("메시지 파싱 에러", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket 에러", error);
    };

    socket.onclose = (e) => {
      console.error(
        `WebSocket onclose roomId=${roomId}, 코드:${e.code}, 원인:${e.reason}`
      );
      delete wsCache[roomId];
      setTimeout(() => connect(roomId), 10000);
    };

    return socket;
  };

  const sendMessage = (roomId: string, data: string) => {
    const socket = wsCache[roomId];
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
    const socket = wsCache[roomId];
    if (socket) {
      console.log(`disconnect roomId=${roomId}`);
      socket.close();
      delete wsCache[roomId];
    } else {
      console.error(`이미 roomId=${roomId} 소켓이 없거나 닫힘`);
    }
  };

  return { connect, sendMessage, disconnect };
};

export default useWebSocket;
