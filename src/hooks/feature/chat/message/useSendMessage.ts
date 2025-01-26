import useInput from "@/hooks/common/useInput";
import useWebSocket from "../../webSocket/useWebSocket";

interface UseChatProps {
  roomId: string;
}

// TODO: 파일 업로드 & 이모지 기능 구현
// 1. 파일 메시지 전송
//    - 이미지, 동영상, 문서 등 다양한 파일 형식 지원
//    - 파일 크기 제한 및 압축 처리 <- 불가능할듯
//    - 썸네일 생성 (이미지/동영상)
//    - 파일 메시지 포맷 정의 및 전송 처리
// 2. 이모지 메시지 전송
//    - 이모지 피커 통합
//    - 이모지 메시지 포맷 정의 및 전송 처리

const useSendMessage = ({ roomId }: UseChatProps) => {
  const { value, onChange, onKeyDown, reset } = useInput("");
  const { sendMessage } = useWebSocket(roomId);

  const handleSendMessage = () => {
    if (!value.trim()) return;

    // 런타임에서 테스트용
    // const messagePayload = {
    //   messageType: "CHAT",
    //   roomId,
    //   message: value.trim(),
    //   originFileUrl: "",
    //   thumbnailUrl: "",
    // };

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
  };
};

export default useSendMessage;
