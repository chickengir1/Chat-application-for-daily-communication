import { useState, useEffect } from "react";
import { axiosInstance, handleApiCall } from "@/api/axiosInstance";

interface Room {
  roomId: string;
  roomName: string;
  ownerId: string;
  lastMessage: string;
  roomType: string;
  participants: string[];
  createdAt: string;
}

// 공통 에러 처리 ui 만들어야함
const fetchRoomList = async (
  setError: (error: string) => void
): Promise<Room[] | null> => {
  setError("알 수 없는 에러가 발생했습니다.");

  const data = await handleApiCall<Room[]>(
    axiosInstance.get("/api/chat/roomlist"),
    (err) => {
      console.error("목록을 가져오는 중 에러 발생", err.message);
      setError("방 목록을 가져오는 데 실패했습니다.");
    }
  );

  return data;
};

export const useRoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchRooms = async () => {
    setIsLoading(true);
    const data = await fetchRoomList(setError);
    if (data) setRooms(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return { rooms, isLoading, error, refetch: fetchRooms };
};
