/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { authStore } from "@/stores/authStore";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://kdt-pt-1-pj-1-team01.elicecoding.com/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const { accessToken } = authStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
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
export function handleApiCall<T>(apiCall: Promise<T>): Promise<T>;

// Overload 2: onError가 제공된 경우
export function handleApiCall<T, E = any>(
  apiCall: Promise<T>,
  onError: (error: Error) => E
): Promise<T | E>;

// Implementation
export async function handleApiCall<T, E = any>(
  apiCall: Promise<T>,
  onError?: (error: Error) => E
): Promise<T | E | null> {
  try {
    return await apiCall;
  } catch (error: unknown) {
    const customError = new Error("API 요청 실패", { cause: error });

    console.error(customError.message);
    console.error("에러 원인", customError.cause);

    if (onError) {
      return onError(customError);
    }

    return null;
  }
}
