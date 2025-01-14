import useInput from "@/hooks/common/useInput";
import useWebSocket from "../useWebSocket";

interface UseChatProps {
  wsUrl: string;
}

export default function useChat({ wsUrl }: UseChatProps) {
  const { value, onChange, onKeyDown, reset } = useInput("");
  const { connect, sendMessage, disconnect } = useWebSocket(wsUrl);

  const handleSendMessage = () => {
    if (value.trim()) {
      sendMessage(value);
      reset();
    }
  };

  return {
    value,
    onChange,
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
      onKeyDown(e, handleSendMessage),
    handleSendMessage,
    connect,
    disconnect,
  };
}
