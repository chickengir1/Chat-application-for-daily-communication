import { axiosInstance, handleApiCall } from "@/api/axiosInstance";

interface SendVerificationCodeToFindPasswordRequest {
  verification_code: string;
}

interface SendVerificationCodeToFindPasswordResponse {
  message: string;
}

export const useFindPassword = () => {
  const sendVerificationCodeToFindPassword = async ({
    verificationCode,
  }: {
    verificationCode: string;
  }) => {
    const dto: SendVerificationCodeToFindPasswordRequest = {
      verification_code: verificationCode,
    };

    const { message } =
      await handleApiCall<SendVerificationCodeToFindPasswordResponse>(
        axiosInstance.post("/api/users/forgot-password", dto)
      );

    if (message === "Code Verified") {
      return true;
    }
    return false;
  };

  return { sendVerificationCodeToFindPassword };
};
