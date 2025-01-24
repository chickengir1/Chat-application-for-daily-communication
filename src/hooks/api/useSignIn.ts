import { axiosInstance, handleApiCall } from "@/api/axiosInstance";
import { authStore } from "@/stores/authStore";

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  email: string;
  accessToken: string;
  refreshToken: string;
}

export const useSignIn = () => {
  const { setAccessToken, setRefreshToken } = authStore((state) => state);

  const signIn = async (dto: SignInRequest) => {
    const { accessToken, refreshToken } = await handleApiCall<SignInResponse>(
      axiosInstance.post("/api/login", dto),
      () => ({ accessToken: null, refreshToken: null })
    );

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      return true;
    }
    return false;
  };

  return { signIn };
};
