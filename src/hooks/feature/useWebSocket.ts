import { useRef } from "react";

export default function useWebSocket(url: string) {
  const socket = useRef<WebSocket | null>(null);

  const connect = () => {
    socket.current = new WebSocket(url);

    socket.current.onopen = () => console.log("WebSocket connected");
    socket.current.onclose = () => console.log("WebSocket disconnected");
    socket.current.onerror = (error) =>
      console.error("WebSocket error:", error);
  };

  const sendMessage = (message: string) => {
    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify({ message }));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  const disconnect = () => {
    socket.current?.close();
  };

  return { connect, sendMessage, disconnect };
}
