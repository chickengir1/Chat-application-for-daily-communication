import { useCallback } from "react";
import { roomStore } from "@/stores/roomStore";

interface Chat {
  id: number;
  name: string;
  lastChat: string;
  createdAt: string;
}

// 시간 포맷용 유틸 함수
const formatTime = (createdAt: string): string =>
  new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const findSelectedChat = (chatList: Chat[], id: number) =>
  chatList.find((chat) => chat.id === id);

/**
 * 채팅방 클릭 핸들러를 생성하는 훅
 *
 * @param {Chat[]} chats - 채팅 목록
 * @param {function} [onChatClick] - 채팅방 클릭 시 호출되는 콜백 함수
 * @returns {object} - handleChatClicked 함수와 formatTime 함수 반환
 */
const useChatHandlers = (chats: Chat[], onChatClick?: (id: number) => void) => {
  const handleChatClicked = useCallback(
    (chatId: number) => () => {
      const selectedChat = findSelectedChat(chats, chatId);

      if (!selectedChat) return;

      const participantCount = selectedChat.name.split(", ").length;
      const roomName = selectedChat.name;
      const participantInfo = `${participantCount}명의 참여자`;

      roomStore.getState().setRoom(chatId, roomName, participantInfo);

      onChatClick?.(chatId);
    },
    [chats, onChatClick]
  );

  return { handleChatClicked, formatTime };
};

export default useChatHandlers;
