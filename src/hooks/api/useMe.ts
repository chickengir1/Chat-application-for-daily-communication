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
}

interface ChangeProfilePictureRequest {
  formData: FormData;
}

export const useMe = () => {
  const { setProfile } = userStore();

  const getProfile = async () => {
    const result = await handleApiCall<GetProfileResponse>(
      axiosInstance.get("/api/users")
    );

    if (result) {
      setProfile(result);
    }
    return false;
  };

  const changeProfilePicture = async ({
    formData,
  }: ChangeProfilePictureRequest) => {
    const result = await handleApiCall<GetProfileResponse>(
      axiosInstance.post("/api/files/upload?category=profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );

    if (result) {
      setProfile(result);
    }
    return false;
  };

  return { getProfile, changeProfilePicture };
};
