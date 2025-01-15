import { useState, useMemo } from "react";

interface ChatRoom {
  id: number;
  name: string;
  createdAt: string;
  lastChat: string;
}

interface ChatMessage {
  messageType: string;
  sender: string;
  userId: number;
  message: string;
  createdAt: string;
  roomId: number;
}

// 방 선택
const getSelectedRoom = (
  selectedChatId: number,
  chatListData: ChatRoom[]
): Partial<ChatRoom> =>
  chatListData.find((room) => room.id === selectedChatId) || {};

// 방 이름
const getRoomName = (selectedRoom: Partial<ChatRoom>): string =>
  selectedRoom.name || "";

// 참여자 수
const getParticipantCount = (selectedRoom: Partial<ChatRoom>): number =>
  selectedRoom.name?.split(",").map((s) => s.trim()).length || 0;

// 선택된 방 메시지 필터링 <- 테스트 해보고 제대로 동작 하는지 검증 해야함(브로드 캐스트)
const getFilteredChatData = (
  selectedChatId: number,
  chatData: ChatMessage[]
): ChatMessage[] => chatData.filter((msg) => msg.roomId === selectedChatId);

/**
 * 선택된 채팅방 정보를 관리하는 커스텀 훅
 *
 * @param {ChatRoom[]} chatListData - 채팅방 목록 배열
 * @param {ChatMessage[]} chatData - 전체 메시지 배열
 *
 * @returns {{
 *   selectedChatId: number; // 현재 선택된 채팅방 ID
 *   handleChatClick: (roomId: number) => void; // 채팅방을 선택하는 핸들러 함수
 *   selectedRoom: Partial<ChatRoom>; // 현재 선택된 채팅방의 정보 (부분적일 수 있음)
 *   roomName: string; // 선택된 채팅방 이름
 *   participantCount: number; // 선택된 채팅방의 참여자 수
 *   filteredChatData: ChatMessage[]; // 선택된 채팅방과 관련된 메시지 배열
 * }}
 *
 * @example
 * // 사용 예시:
 * const {
 *   selectedChatId,
 *   handleChatClick,
 *   selectedRoom,
 *   roomName,
 *   participantCount,
 *   filteredChatData,
 * } = useSelectedChatRoom(chatListData, chatData);
 *
 * @example
 * // 반환값 예시:
 * {
 *   selectedChatId: 1,
 *   handleChatClick: function(roomId: number) { ... },
 *   selectedRoom: {
 *     id: 1,
 *     name: "user1, user2",
 *     createdAt: "2025-01-01T12:00:00Z",
 *     lastChat: "Hello, world!"
 *   },
 *   roomName: "user1, user2",
 *   participantCount: 2,
 *   filteredChatData: [
 *     {
 *       messageType: "CHAT",
 *       sender: "일론머스크",
 *       userId: 2,
 *       message: "Hey There!",
 *       createdAt: "2025-01-01T10:00:00Z",
 *       roomId: 1
 *     }
 *   ]
 * }
 */

const useSelectedChatRoom = (
  chatListData: ChatRoom[],
  chatData: ChatMessage[]
) => {
  const [selectedChatId, setSelectedChatId] = useState<number>(0);

  const handleChatClick = (roomId: number): void => {
    setSelectedChatId(roomId);
  };

  // 방 선택
  const selectedRoom = useMemo(
    () => getSelectedRoom(selectedChatId, chatListData),
    [selectedChatId, chatListData]
  );

  // 방 이름
  const roomName = useMemo(() => getRoomName(selectedRoom), [selectedRoom]);

  // 참여자 수
  const participantCount = useMemo(
    () => getParticipantCount(selectedRoom),
    [selectedRoom]
  );

  // 선택된 방 메시지 필터링 <- 테스트 해보고 제대로 동작 하는지 검증 해야함(브로드 캐스트)
  const filteredChatData = useMemo(
    () => getFilteredChatData(selectedChatId, chatData),
    [selectedChatId, chatData]
  );

  return {
    selectedChatId,
    handleChatClick,
    selectedRoom,
    roomName,
    participantCount,
    filteredChatData,
  };
};

export default useSelectedChatRoom;
