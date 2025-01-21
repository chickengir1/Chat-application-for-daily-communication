import { FaSearch } from "react-icons/fa";
import Input from "@/components/common/Input";
import useInput from "@/hooks/common/useInput";
import { useEffect } from "react";
import useChatRooms from "@/hooks/feature/chat/useChatRooms";
import NotificationItem from "@/components/feature/notifications/NotificationItem";
import { notifications } from "@/utils/stub";

const NotificationsPage = () => {
  const { value: search, onChange: setSearch } = useInput("");
  const { filteredRooms, filterRooms } = useChatRooms(notifications);

  useEffect(() => {
    filterRooms(search);
  }, [search, filterRooms]);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Notifications</h1>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <Input
            value={search}
            onChange={setSearch}
            placeholder="검색"
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.notificationListContainer}>
        <ul className={styles.notificationList}>
          {filteredRooms.map((notify) => (
            <NotificationItem
              key={notify.id}
              name={notify.name}
              lastChat={notify.lastChat}
              createdAt={notify.createdAt}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsPage;

const styles = {
  container: "flex h-screen flex-col p-2 pb-20 md:p-6 md:pb-6 md:pl-0 md:pr-6",
  headerContainer:
    "flex items-center justify-between mb-4 border-b border-gray-500 pb-4",
  header: "text-2xl font-bold",
  searchContainer:
    "flex h-10 items-center rounded-lg bg-[#505050] px-2 text-white duration-200 ease-in-out hover:bg-[#404040] w-1/2 md:w-1/3",
  searchIcon: "mx-2 text-gray-300",
  input:
    "w-full rounded-lg bg-transparent px-2 text-white placeholder-gray-400 outline-none",
  notificationListContainer:
    "flex flex-col w-full h-full space-y-4 rounded-lg bg-[#505050] p-4 text-white",
  notificationList: "space-y-4",
};
