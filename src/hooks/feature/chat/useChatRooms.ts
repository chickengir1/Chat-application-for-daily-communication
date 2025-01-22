import { useState, useEffect, useCallback } from "react";

interface Room {
  roomId: string;
  roomName: string;
  ownerId: string;
  lastMessage: string;
  roomType: string;
  participants: string[];
  createdAt: string;
}

// 채팅방 정렬 함수
const sortChatRooms = (rooms: Room[]): Room[] =>
  [...rooms].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

// 검색 필터 함수
const filterChatRooms = (rooms: Room[], search: string): Room[] =>
  rooms.filter((room) =>
    room.roomName.toLowerCase().includes(search.toLowerCase())
  );

/**
 * 채팅방 리스트 정렬 및 검색을 위한 커스텀 훅
 * @param {Room[]} initialRooms 초기 채팅방 목록
 */
const useChatRooms = (initialRooms: Room[]) => {
  const [chatRooms, setChatRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(initialRooms);

  // 초기 채팅방 정렬
  useEffect(() => {
    const sortedRooms = sortChatRooms(initialRooms);
    setChatRooms(sortedRooms);
    setFilteredRooms(sortedRooms); // 초기 검색 결과를 정렬된 상태로 설정
  }, [initialRooms]);

  const filterRooms = useCallback(
    (search: string) => {
      if (!search.trim()) {
        setFilteredRooms(chatRooms);
      } else {
        const result = filterChatRooms(chatRooms, search);
        setFilteredRooms(result);
      }
    },
    [chatRooms]
  );

  return {
    chatRooms,
    filteredRooms,
    filterRooms,
  };
};

export default useChatRooms;
