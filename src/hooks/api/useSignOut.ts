import { axiosInstance, handleApiCall } from "@/api/axiosInstance";
import { authStore } from "@/stores/authStore";

interface SignOutResponse {
  message: string;
}

export const useSignOut = () => {
  const { setAccessToken, setRefreshToken } = authStore((state) => state);

  const signOut = async () => {
    const { message } = await handleApiCall<SignOutResponse>(
      axiosInstance.post("/api/logout", null)
    );

    if (message === "로그아웃 완료") {
      setAccessToken("");
      setRefreshToken("");
      return true;
    }
    return false;
  };

  return { signOut };
};
