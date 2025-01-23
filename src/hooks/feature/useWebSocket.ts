import { Message, messageStore } from "@/stores/messageStore";
const wsCache: Record<string, WebSocket> = {};

const useWebSocket = (baseUrl: string) => {
  const { addMessage } = messageStore();

  const connect = (roomId: string) => {
    if (wsCache[roomId]) {
      // 이 콘솔은 서버와 연결을 보장하는게 아닌 요청을 보냈다는 사실을 확인하기 위한 것입니다.
      // 소켓 인스턴스가 생성되면 결과와 상관없이 이미 캐싱이 진행중이라는 사실만을 알려주는 것입니다.
      console.warn(`이미 연결된 WebSocket이 있습니다. roomId=${roomId}`);
      return wsCache[roomId];
    }

    const url = `${baseUrl}/chat/${encodeURIComponent(roomId)}?token=`;
    const socket = new WebSocket(url);

    console.log(`WebSocket 연결 중... ${url}`);
    wsCache[roomId] = socket; // 캐시에 저장

    socket.onopen = () => {
      // [필독] 디버깅용임 실제 연결이 완료되거나 프로덕트 레벨이되면 사용하지 않는 코드임.
      // [주의] onopen이 호출된 직후, 서버 쪽에서 거부하면 onclose가 곧바로 올 수도 있음.
      // [주의] onopen이벤트는 서버 유무와 상관없이 호출됨.
      console.warn("onopen이벤트 RoomID =", roomId);
    };

    socket.onmessage = (event) => {
      try {
        const parsedData: Message = JSON.parse(event.data);
        console.log("서버로부터 수신된 메시지", parsedData);
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
      // 재연결 시도
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
