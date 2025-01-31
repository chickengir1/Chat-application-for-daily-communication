import { axiosInstance, handleApiCall } from "@/api/axiosInstance";

const useAddFriends = () => {
  const handleAddFriend = async (email: string) => {
    const response = await handleApiCall(
      axiosInstance.post(`api/friendship/${email}`)
    );
    if (!response) {
      throw new Error("친구 추가에 실패했습니다.");
    }
    if (response) {
      alert(`${email.split("@")[0]}님을 친구로 추가했습니다.`);
    }
  };

  return { handleAddFriend };
};

export default useAddFriends;
