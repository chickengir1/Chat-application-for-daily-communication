import { axiosInstance, handleApiCall } from "@/api/axiosInstance";

interface ValidateEmailResponse {
  result: boolean;
}

export const useSignup = () => {
  const emailExists = async (email: string) => {
    const { result } = await handleApiCall<
      ValidateEmailResponse,
      ValidateEmailResponse
    >(axiosInstance.get(`/api/user/check/email/${email}`), () => ({
      result: true,
    }));

    return result;
  };

  return { emailExists };
};
