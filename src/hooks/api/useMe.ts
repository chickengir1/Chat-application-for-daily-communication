import { axiosInstance, handleApiCall } from "@/api/axiosInstance";
import { userStore } from "@/stores/userStore";

interface GetProfileResponse {
  id: number;
  nickname: string;
  email: string;
  password: string;
  isFirstLogin: boolean;
  role: string;
  profileImg: string;
  activated: boolean;
  oauthProvider: string;
  oauthId: string;
  oauthToken: string;
  statusMessage: string;
}

export const useMe = () => {
  const { setProfile } = userStore();

  const getProfile = async () => {
    const result = await handleApiCall<GetProfileResponse>(
      axiosInstance.get("/api/users")
    );

    if (result) {
      console.log(result);
      setProfile(result);
    }
    return false;
  };

  return { getProfile };
};
