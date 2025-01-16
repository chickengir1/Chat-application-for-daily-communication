import useInput from "@/hooks/common/useInput";
import useWebSocket from "../useWebSocket";

interface UseChatProps {
  wsUrl: string;
}

/** 메세지 전송용 커스텀 훅 MessageInput.tsx에서 사용 */
const useSendMessage = ({ wsUrl }: UseChatProps) => {
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
    onKeyDown: onKeyDown(handleSendMessage),
    handleSendMessage,
    connect,
    disconnect,
  };
};

export default useSendMessage;
