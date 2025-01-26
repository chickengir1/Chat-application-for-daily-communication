import useInput from "@/hooks/common/useInput";
import useWebSocket from "../webSocket/useWebSocket";

interface UseChatProps {
  roomId: string;
}

/** 메시지 전송용 커스텀 훅 */
const useSendMessage = ({ roomId }: UseChatProps) => {
  const { value, onChange, onKeyDown, reset } = useInput("");
  const { sendMessage } = useWebSocket(roomId);

  const handleSendMessage = () => {
    if (!value.trim()) return;

    const messagePayload = {
      messageType: "CHAT",
      roomId,
      message: value.trim(),
    };

    // [필독] 디버깅용임 실제 전송되는 메세지 로그임 프로덕트에선 삭제.
    console.warn("디버깅용 전송된 메세지 로그", messagePayload);

    sendMessage(JSON.stringify(messagePayload));
    reset();
  };

  return {
    value,
    onChange,
    onKeyDown: onKeyDown(handleSendMessage),
    handleSendMessage,
  };
};

export default useSendMessage;
