import useInput from "@/hooks/common/useInput";
import useWebSocket from "../../webSocket/useWebSocket";

interface UseChatProps {
  roomId: string;
}

// TODO: 이모지 기능 구현
// 1. 이모지 메시지 전송
//    - 이모지 피커 통합
//    - 이모지 메시지 포맷 정의 및 전송 처리

const useSendMessage = ({ roomId }: UseChatProps) => {
  const { value, onChange, onKeyDown, reset, setValue } = useInput("");
  const { sendMessage } = useWebSocket(roomId);

  const handleSendMessage = () => {
    if (!value.trim()) return;

    const messagePayload = {
      messageType: "CHAT",
      roomId,
      message: value.trim(),
    };

    sendMessage(JSON.stringify(messagePayload));
    reset();
  };

  return {
    value,
    onChange,
    onKeyDown: onKeyDown(handleSendMessage),
    handleSendMessage,
    setValue,
  };
};

export default useSendMessage;
