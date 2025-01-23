import { useState } from "react";

export const useChatParticipants = () => {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("DM");
  const [selectedFriend, setSelectedFriend] = useState<string[]>([]);
  const [error, setError] = useState("");

  // 채팅 종류 선택 시 selectedFriend 리셋
  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomType(e.target.value);
    setSelectedFriend([]); // 채팅 종류 변경 시 친구 목록 초기화
  };

  // 선택된 채팅할 친구 삭제
  const handleRemoveFriend = (friend: string) => {
    setSelectedFriend((prev) => prev.filter((f) => f !== friend));
  };

  // 친구 선택
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (roomType === "1:1") {
      setSelectedFriend([value]); // 1:1 채팅일 때는 배열로 친구 하나만 선택
    } else {
      // 그룹 채팅일 때는 여러 명을 선택할 수 있음
      if (!value || selectedFriend.includes(value)) return;
      setSelectedFriend((prev) => [...prev, value]);
    }
  };

  return {
    roomName,
    setRoomName,
    roomType,
    setRoomType,
    selectedFriend,
    setSelectedFriend,
    error,
    setError,
    handleRoomTypeChange,
    handleRemoveFriend,
    handleSelectChange,
  };
};
