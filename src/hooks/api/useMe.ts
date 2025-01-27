import { axiosInstance, handleApiCall } from "@/api/axiosInstance";
import { userStore, UserProfile } from "@/stores/userStore";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GetProfileResponse extends UserProfile {}

interface ChangeProfilePictureRequest {
  formData: FormData;
}

export const useMe = () => {
  const { setProfile } = userStore();

  const getProfile = async () => {
    const result = await handleApiCall<GetProfileResponse>(
      axiosInstance.get("/api/user/")
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
