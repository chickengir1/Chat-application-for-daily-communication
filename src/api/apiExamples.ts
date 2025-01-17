import { axiosInstance, handleApiCall } from "./axiosInstance";

/**
 * GET 요청
 * @param {string} api - API 엔드포인트 ("/data")
 * @returns {Promise<T | null>} API 응답 데이터 또는 null
 * @example
 * useEffect(() => {
 *   fetchData("/data").then((response) => {
 *     const data = response ?? { data: [] }; // 기본값 설정
 *     console.log("데이터", data);
 *   });
 * });
 */
export const fetchData = async <T>(api: string): Promise<T | null> => {
  return handleApiCall(axiosInstance.get(api));
};

/**
 * POST 요청
 * @param {object} data - 서버로 전송할 데이터 객체
 * @param {string} api - API 엔드포인트 ("/data")
 * @returns {Promise<T | null>} API 응답 데이터 또는 null
 * @example
 * const handlePost = () => {
 *   postData({ name: "새 데이터" }, "/data").then((response) => {
 *     const result = response ?? { success: false }; // 기본값 설정
 *     console.log("POST 결과", result);
 *   });
 * };
 */
export const postData = async <T>(
  data: object,
  api: string
): Promise<T | null> => {
  return handleApiCall(axiosInstance.post(api, data));
};

/**
 * PUT 요청
 * @param {number} id - 수정할 리소스의 ID
 * @param {object} data - 수정할 데이터 객체
 * @param {string} api - API 엔드포인트 ("/data")
 * @returns {Promise<T | null>} API 응답 데이터 또는 null
 * @example
 * const handleUpdate = () => {
 *   updateData(123, { name: "업데이트된 데이터" }, "/data").then((response) => {
 *     const result = response ?? { success: false }; // 기본값 설정
 *     console.log("PUT 결과", result);
 *   });
 * };
 */
export const updateData = async <T>(
  id: number,
  data: object,
  api: string
): Promise<T | null> => {
  return handleApiCall(axiosInstance.put(`/${api}/${id}`, data));
};

/**
 * DELETE 요청
 * @param {number} id - 삭제할 리소스의 ID
 * @param {string} api - API 엔드포인트 ("/data")
 * @returns {Promise<T | null>} API 응답 데이터 또는 null
 * @example
 * const handleDelete = () => {
 *   deleteData(123, "/data").then((response) => {
 *     const result = response ?? { success: false }; // 기본값 설정
 *     console.log("DELETE 결과", result);
 *   });
 * };
 */
export const deleteData = async <T>(
  id: number,
  api: string
): Promise<T | null> => {
  return handleApiCall(axiosInstance.delete(`/${api}/${id}`));
};
