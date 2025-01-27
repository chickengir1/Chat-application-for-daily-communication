import { axiosInstance, handleApiCall } from "@/api/axiosInstance";
import { authStore } from "@/stores/authStore";
import { useEffect, useState } from "react";

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  email: string;
  accessToken: string;
  refreshToken: string;
}

interface SignOutResponse {
  message: string;
}

interface ValidateEmailResponse {
  result: boolean;
}

interface ValidateNicknameResponse {
  result: boolean;
}

interface SendVerificationCodeRequest {
  email: string;
}

interface SendVerificationCodeResponse {
  message: string;
}

interface VerifyEmailRequest {
  email: string;
  verifyCode: string;
}

interface VerifyEmailResponse {
  result: boolean;
}

interface SignUpRequest {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

interface SignUpResponse {
  message: string;
}

export const useAuth = () => {
  const { accessToken, setAccessToken, setRefreshToken } = authStore(
    (state) => state
  );
  const [isSignedIn, setIsSignedIn] = useState(Boolean(accessToken));

  useEffect(() => {
    setIsSignedIn(Boolean(accessToken));
  }, [accessToken]);

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

  const emailExists = async (email: string) => {
    const { result } = await handleApiCall<
      ValidateEmailResponse,
      ValidateEmailResponse
    >(axiosInstance.get(`/api/user/check/email/${email}`), () => ({
      result: true,
    }));

    return result;
  };

  const nicknameExists = async (nickname: string) => {
    const { result } = await handleApiCall<
      ValidateNicknameResponse,
      ValidateNicknameResponse
    >(axiosInstance.get(`/api/user/check/nickname/${nickname}`), () => ({
      result: true,
    }));

    return result;
  };

  const sendVerificationCodeToEmail = async (
    dto: SendVerificationCodeRequest
  ) => {
    const { message } = await handleApiCall<SendVerificationCodeResponse>(
      axiosInstance.post(`/api/email/send`, dto)
    );

    // TODO: 나중에 message가 아닌 다른 값으로 검증하도록 수정해야함
    return message === "인증코드가 발송되었습니다.";
  };

  const verifyEmail = async (dto: VerifyEmailRequest) => {
    const { result } = await handleApiCall<VerifyEmailResponse>(
      axiosInstance.post(`/api/email/verify`, dto)
    );

    // TODO: 나중에 message가 아닌 다른 값으로 검증하도록 수정해야함
    return result;
  };

  const signUp = async (dto: SignUpRequest) => {
    const { message } = await handleApiCall<SignUpResponse>(
      axiosInstance.post("/api/register", dto)
    );

    // TODO: 나중에 message가 아닌 다른 값을 사용해서 비교하도록 수정해야함
    return message === "register success!";
  };

  return {
    isSignedIn,
    signIn,
    signOut,
    emailExists,
    nicknameExists,
    sendVerificationCodeToEmail,
    verifyEmail,
    signUp,
  };
};
