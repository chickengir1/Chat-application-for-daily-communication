import { useState, useEffect, useCallback, useRef } from "react";
import { axiosInstance, handleApiCall } from "@/api/axiosInstance";

interface Notification {
  id: number;
  receiver: string;
  sender: string;
  message: string;
  createdAt: string;
  read: boolean;
}

// 런타임에서 테스트 해야하는데 하다가 토큰 만료돼서 실패함 ㅠㅠ
// interface Pageable {
//   pageNumber: number;
//   pageSize: number;
//   offset: number;
//   last: boolean;
// }

interface NotificationResponse {
  // pageable: Pageable;
  content: Notification[];
}

// 토큰 받고 테스트 후 불필요한 코드 모두 삭제 예정

const fetchNotifications = async (
  page: number,
  size: number,
  setError: (error: string) => void
): Promise<NotificationResponse | null> => {
  const data = await handleApiCall<NotificationResponse>(
    axiosInstance.get(`/api/users/notifications?page=${page}&size=${size}`),
    (err) => {
      console.error("알림 데이터를 가져오는 중 에러 발생", err.message);
      setError("알림을 가져오는 데 실패했습니다.");
    }
  );

  return data;
};

const useNotificationAlert = (page = 0, size = 10) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const isFetching = useRef(false);

  const fetchNotificationData = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    setIsLoading(true);
    setError("");

    try {
      const data = await fetchNotifications(page, size, setError);
      if (data) {
        setNotifications(data.content);
      }
    } finally {
      isFetching.current = false;
      setIsLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    fetchNotificationData();
  }, [fetchNotificationData]);

  return {
    notifications,
    isLoading,
    error,
    refetch: fetchNotificationData,
  };
};
export default useNotificationAlert;
