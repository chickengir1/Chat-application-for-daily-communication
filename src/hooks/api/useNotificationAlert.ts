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

interface NotificationResponse {
  content: Notification[];
}

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
