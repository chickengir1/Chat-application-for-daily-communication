import { webSocketClientConfig } from "@/ws/wsClient";
import { useRef } from "react";

export default function useWebSocket(url: string) {
  const webSocketClient = useRef(webSocketClientConfig(url));

  const connect = () => webSocketClient.current.connect();
  const sendMessage = (message: string) =>
    webSocketClient.current.sendMessage(message);
  const disconnect = () => webSocketClient.current.disconnect();

  return { connect, sendMessage, disconnect };
}
