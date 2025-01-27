import { useCallback } from "react";
import { roomStore } from "@/stores/roomStore";

interface Chat {
  roomId: string;
  roomName: string;
  ownerId: string;
  lastMessage: string;
  roomType: string;
  participants: string[];
  createdAt: string;
}

// 시간 포맷용 유틸 함수
export const formatTime = (createdAt: string): string =>
  new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

// 선택한 채팅방 찾기
const findSelectedChat = (chatList: Chat[], roomId: string) =>
  chatList.find((chat) => chat.roomId === roomId);

/**
 * 채팅방 클릭 핸들러를 생성하는 훅
 *
 * @param {Chat[]} chats - 채팅 목록
 * @param {function} [onChatClick] - 채팅방 클릭 시 호출되는 콜백 함수
 * @returns {object} - handleChatClicked 함수와 formatTime 함수 반환
 */
const useChatHandlers = (
  chats: Chat[],
  onChatClick?: (roomId: string) => void
) => {
  const handleChatClicked = useCallback(
    (chatId: string) => () => {
      const selectedChat = findSelectedChat(chats, chatId);

      if (!selectedChat) return;

      const participantCount = selectedChat.participants.length; // 참여자 배열 길이
      const participants = selectedChat.participants; // 참여자 목록
      const roomName = selectedChat.roomName; // 채팅방 이름
      const participantInfo = `${participantCount}명의 참여자`; // 참여자 정보

      roomStore
        .getState()
        .setRoom(chatId, roomName, participantInfo, participants);

      onChatClick?.(chatId);
    },
    [chats, onChatClick]
  );

  return { handleChatClicked, formatTime };
};

export default useChatHandlers;
