import { FaBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

interface NotificationItemProps {
  name: string;
  lastChat: string;
  createdAt: string;
}

const NotificationItem = ({
  name,
  lastChat,
  createdAt,
}: NotificationItemProps) => {
  return (
    <li className={styles.listItem}>
      <div className={styles.avatarContainer}>
        <FaUserCircle className={styles.avatarIcon} />
        <div className={styles.textContainer}>
          <p className={styles.nameText}>{name}</p>
          <p className={styles.lastChatText}>{lastChat}</p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <p className={styles.createdAtText}>{createdAt}</p>
        <FaBell className={styles.bellIcon} />
      </div>
    </li>
  );
};

export default NotificationItem;

const styles = {
  listItem:
    "flex cursor-pointer items-center justify-between border-b border-gray-50 px-3 py-4 transition-colors hover:rounded-lg hover:bg-[#404040]",
  avatarContainer: "flex items-center space-x-4",
  avatarIcon: "text-4xl text-gray-300 sm:text-5xl",
  textContainer: "flex flex-col",
  nameText: "text-base font-bold text-white sm:text-lg",
  lastChatText: "text-sm text-gray-200 sm:text-base",
  rightContainer: "flex items-end space-x-4 space-y-2",
  createdAtText: "pb-1 text-sm text-gray-400 sm:text-base",
  bellIcon: "text-2xl text-gray-300 sm:text-3xl",
};
