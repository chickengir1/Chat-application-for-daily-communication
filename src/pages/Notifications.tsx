import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Input from "@/components/common/Input";
import useInput from "@/hooks/common/useInput";
import NotificationItem from "@/components/feature/notifications/NotificationItem";
import useNotificationAlert from "@/hooks/api/useNotificationAlert";

interface Notification {
  id: number;
  sender: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const NotificationsPage = () => {
  const { value: search, onChange: setSearch } = useInput("");
  const [page, setPage] = useState(0);
  const { notifications, refetch } = useNotificationAlert(page, 10);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  // 나중에 유틸 레이어나 훅 레이어로 뺄거임
  const changePage = (direction: "prev" | "next") => () => {
    setPage((prevPage) => {
      const newPage =
        direction === "next" ? prevPage + 1 : Math.max(prevPage - 1, 0);
      return newPage;
    });
  };

  // [로직 구현 필요] 나중에 유틸 레이어나 훅 레이어로 뺄거임
  const onNotifyDelete = (id: number) => () => {
    console.log(`알림 ${id} 삭제`);
  };

  const notificationList = notifications.filter((notify) =>
    notify.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Notifications</h1>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <Input
            value={search}
            onChange={setSearch}
            placeholder="알람 내용 검색"
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.notificationListContainer}>
        <ul className={styles.notificationList}>
          {notificationList.length === 0 ? (
            <h1 className={styles.noNotificationText}>알림이 없습니다.</h1>
          ) : (
            notificationList.map((notify: Notification) => (
              <NotificationItem
                key={notify.id}
                id={notify.id}
                name={notify.sender}
                message={notify.message}
                createdAt={notify.createdAt}
                read={notify.read}
                onDelete={onNotifyDelete(notify.id)}
              />
            ))
          )}
        </ul>
        <div className={styles.paginationButtons}>
          <button
            className={`${styles.pageButton} ${
              page === 0 ? styles.disable : ""
            }`}
            onClick={changePage("prev")}
            disabled={page === 0}
          >
            이전 페이지
          </button>
          <div className={styles.pageNumber}>{page + 1}</div>
          <button className={styles.pageButton} onClick={changePage("next")}>
            다음 페이지
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;

const styles = {
  container: "flex h-screen flex-col p-2 pb-20 md:p-6 md:pb-6 md:pl-0 md:pr-6",
  headerContainer:
    "flex items-center justify-between mb-4 border-b border-gray-600 pb-4",
  header:
    "text-2xl font-bold text-black flex items-center space-x-2 sm:text-3xl drop-shadow-lg",
  searchContainer:
    "flex h-12 md:h-14 items-center rounded-lg bg-[#505050] px-2 text-black duration-200 ease-in-out hover:bg-[#404040] w-1/2 md:w-1/3",
  searchIcon: "mx-2 text-gray-300",
  input:
    "w-full rounded-lg bg-transparent px-2 text-black placeholder-gray-400 outline-none text-white",
  notificationListContainer:
    "relative flex flex-col w-full h-full space-y-4 rounded-lg bg-[#505050] p-4 text-black",
  notificationList: "space-y-4",
  paginationButtons:
    "absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4",
  pageButton:
    "bg-[#303030] text-white px-3 py-1 text-sm rounded hover:bg-[#202020] transition-colors duration-200",
  disable: "cursor-not-allowed opacity-50",
  pageNumber: "flex items-center justify-center text-lg text-white",
  noNotificationText:
    "flex items-center justify-center text-gray-300 text-xl p-4",
};
