import { handleApiCall, axiosInstance } from "@/api/axiosInstance";
import { useEffect, useState } from "react";

interface Friend {
  friendshipId: number;
  friendEmail: string;
  friendName: string;
  status: string;
  imgUrl: string | null;
}

const useFriendList = () => {
  const [userList, setUserList] = useState<Friend[]>([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await handleApiCall<Friend[]>(
          axiosInstance.get("api/friendship/accepts")
        );

        if (response) {
          setUserList(response);
        }
      } catch (error) {
        console.error("친구 목록을 불러오는데 실패했습니다", error);
        setUserList([]);
      }
    };

    fetchUserList();
  }, []);

  return { userList };
};

export default useFriendList;
