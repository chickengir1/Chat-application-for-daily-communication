import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "@/utils/constans";

/** 공통 설정을 포함한 Axios 인스턴스 생성 */
const createAxiosInstance = (isAuthRequired: boolean): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: 3000,
    headers: { "Content-Type": "application/json" },
  });

  // 인증이 필요할때 Authorization 헤더 추가
  if (isAuthRequired) {
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  return instance;
};

/** 인증용 Axios 인스턴스 */
const authInstance = createAxiosInstance(true);

/** 공개용 Axios 인스턴스 */
const publicInstance = createAxiosInstance(false);

export const axiosInstance = { authInstance, publicInstance };

/**
 * API 호출을 처리하고 에러를 핸들링하는 비동기 함수
 *
 * @template T 반환 타입 제네릭
 * @param {Promise<T>} apiCall - 처리할 API 호출
 * @param {(error: Error) => void} [onError] - 에러 발생 시 실행할 콜백 함수 (선택 사항)
 * @returns {Promise<T | null>} 정상 처리가 되었을 경우 해당 결과값, 에러가 발생한 경우 null 리턴
 *
 * @example
 * const data = await handleApiCall(fetch('https://api.example.com/data'), (error) => {
 *   // 에러 처리 로직 예시
 *   console.error('에러 내용', error);
 * });
 * if (data) {
 *   console.log('API 요청 성공', data);
 * }
 */
export const handleApiCall = async <T>(
  apiCall: Promise<T>,
  onError?: (error: Error) => void
): Promise<T | null> => {
  try {
    const result = await apiCall;
    return result;
  } catch (error: unknown) {
    const customError = new Error("API 요청 실패", { cause: error });

    console.error(customError.message);
    console.error("에러 원인", customError.cause);

    if (onError) onError(customError);
    return null;
  }
};
