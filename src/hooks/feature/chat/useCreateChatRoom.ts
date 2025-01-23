import { useState } from "react";
import { axiosInstance, handleApiCall } from "@/api/axiosInstance";

export const useCreateChatRoom = () => {
  const [error, setError] = useState("");

  const handleCreateChatRoom = async (
    roomName: string,
    roomType: string,
    selectedFriend: string[]
  ) => {
    if (!roomName) {
      setError("채팅방 이름을 입력해주세요.");
      return null;
    }

    if (selectedFriend.length === 0) {
      setError("친구를 선택해주세요.");
      return null;
    }

    const chatData = {
      roomType,
      roomName,
      participants: selectedFriend,
      // participants: ["tester1", "example"],
    };
    console.log(chatData);

    const createRoom = await handleApiCall(
      axiosInstance.post("/api/chat/room", chatData),
      (err) => {
        console.error(err.message);
        setError("에러 발생");
      }
    );

    if (createRoom) {
      console.log("데이터", createRoom);
      return createRoom;
    }

    return null;
  };

  return {
    error,
    setError,
    handleCreateChatRoom,
  };
};
