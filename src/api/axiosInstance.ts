import axios, { AxiosInstance, AxiosResponse } from "axios";

// 테스트용 헤더
/** 
    headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer   },
 */

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://34.47.79.162/",
  headers: {
    "Content-Type": "application/json",
    // dev용 토큰
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZXIxMDAxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM3NzAxNDU0LCJleHAiOjE3Mzc3MDUwNTR9.Z2N4Hp8rATGMTv5BjiYVra1b5yNCnENnjgEOEcjKFKEvyyiQ-0wBgyvPspuXYmbgTFb3uizbWveHfJKTfAia9Q",
  },
  withCredentials: true,
});

// 세션 만료시 쓸거임
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    // 원래는 401일때 처리하는게 맞음
    // 하지만 토큰 관련 테스트 작업으로 인해 400으로 바꿔도 무방
    // 작업 완료 후 401과 403으로 변경 요망
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("세션 만료 또는 인증 실패");

      window.location.href = "/login";
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
