import axios from "axios";
/** [필독!] axiosInstance 백엔드 배포 완료시 baseURL 설정 필요 */
export const axiosInstance = axios.create({
  baseURL: "", // 아직 배포 안됨 나중에 추가
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

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
