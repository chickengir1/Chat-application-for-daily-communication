export function webSocketClientConfig(url: string) {
  let socket: WebSocket | null = null;

  const connect = () => {
    socket = new WebSocket(url);

    socket.onopen = () => console.log("WebSocket connected");
    socket.onclose = () => console.log("WebSocket disconnected");
    socket.onerror = (error) => console.error("WebSocket error", error);
  };

  const sendMessage = (message: string) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message }));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.close();
      socket = null;
    }
  };

  return { connect, sendMessage, disconnect };
}
