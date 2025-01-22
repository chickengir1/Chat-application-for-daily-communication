import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_CONFIG } from "@/utils/constans";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 세션 만료시 쓸거임
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("세션 만료 또는 인증 실패");
      // 로그인 페이지로 이동 등 추가 로직하거나 확장 시켜야함
    }
    return Promise.reject(error);
  }
);

/**
 * API 호출을 처리하고 에러를 핸들링하는 비동기 함수
 *
 * @template T 반환 타입 제네릭
 * @param {Promise<T>} apiCall - 처리할 API 호출
 * @param {(error: Error) => void} [onError] - 에러 발생 시 실행할 콜백 함수 (선택 사항)
 * @returns {Promise<T | null>} 정상 처리가 되었을 경우 해당 결과값, 에러가 발생한 경우 null 리턴
 */
export const handleApiCall = async <T>(
  apiCall: Promise<T>,
  onError?: (error: Error) => void
): Promise<T | null> => {
  try {
    return await apiCall;
  } catch (error: unknown) {
    const customError = new Error("API 요청 실패", { cause: error });

    console.error(customError.message);
    console.error("에러 원인", customError.cause);

    if (onError) onError(customError);
    return null;
  }
};
