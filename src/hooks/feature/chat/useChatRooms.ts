import { useState, useEffect, useCallback } from "react";

interface ChatRoom {
  id: number;
  name: string;
  createdAt: string;
  lastChat: string;
}

// 채팅방 정렬
const sortChatRooms = (rooms: ChatRoom[]): ChatRoom[] => {
  return [...rooms].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// 검색 필터
const filterChatRooms = (rooms: ChatRoom[], search: string): ChatRoom[] => {
  return rooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );
};

/** 채팅방 리스트 정렬 및 검색을 위한 커스텀 훅 ChatPage.tsx에서 사용 */
const useChatRooms = (initialRooms: ChatRoom[]) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<ChatRoom[]>([]);

  // 채팅방 정렬 호출
  useEffect(() => {
    setChatRooms(sortChatRooms(initialRooms));
  }, [initialRooms]);

  // 검색 필터 호출
  const filterRooms = useCallback(
    (search: string) => {
      const result = filterChatRooms(chatRooms, search);
      setFilteredRooms(result);
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
