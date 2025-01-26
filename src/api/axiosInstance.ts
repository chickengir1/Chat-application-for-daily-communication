/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { authStore } from "@/stores/authStore";

// 테스트용 헤더
/** 
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer `},
 */

//dev 용 엑세스 토큰
// eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZXIxMDAxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM3NzkyNjAwLCJleHAiOjE3Mzc3OTYyMDB9.FW2216KK4kn5qLD3qcXrAmB27AF9fAZ-y1F8mi7S6ax7RK6Q2e2PHCBTpJ5YBy8MbhR4KlQFb32tCG15SiXRIg

const { accessToken } = authStore.getState();

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://34.47.79.162/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

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
