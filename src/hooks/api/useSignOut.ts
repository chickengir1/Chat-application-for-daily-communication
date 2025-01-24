import { axiosInstance, handleApiCall } from "@/api/axiosInstance";
import { authStore } from "@/stores/authStore";

interface SignOutResponse {
  message: string;
}

export const useSignOut = () => {
  const { accessToken, setAccessToken, setRefreshToken } = authStore(
    (state) => state
  );

  const signOut = async () => {
    const { message } = await handleApiCall<SignOutResponse>(
      axiosInstance.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    );

    if (message === "Logout Success") {
      setAccessToken("");
      setRefreshToken("");
      return true;
    }
    return false;
  };

  return { signOut };
};
