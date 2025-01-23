import { FaBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

interface NotificationItemProps {
  name: string;
  lastChat: string;
  createdAt: string;
  onDelete?: () => void;
}

const NotificationItem = ({
  name,
  lastChat,
  createdAt,
  onDelete,
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
        <div className={styles.iconContainer}>
          <FaBell className={styles.bellIcon} />
          {onDelete && (
            <button className={styles.deleteButton} onClick={onDelete}>
              <FaTrash />
            </button>
          )}
        </div>
        <p className={styles.createdAtText}>{createdAt}</p>
      </div>
    </li>
  );
};

export default NotificationItem;

const styles = {
  listItem:
    "flex cursor-pointer items-center justify-between border-b border-gray-50 px-3 py-4 transition-colors hover:rounded-lg hover:bg-[#404040]",
  avatarContainer: "flex items-center space-x-4 flex-1 min-w-0",
  avatarIcon: "text-4xl text-gray-300 sm:text-5xl flex-shrink-0",
  textContainer: "flex flex-col flex-1 min-w-0",
  nameText: "text-base font-bold text-white sm:text-lg",
  lastChatText: "text-sm text-gray-200 sm:text-base truncate max-w-full",
  rightContainer:
    "flex flex-col items-end space-y-2 md:space-y-0 md:items-center md:space-x-4",
  createdAtText: "text-sm text-gray-400 sm:text-base",
  iconContainer: "flex w-full items-center justify-end space-x-4",
  bellIcon: "text-2xl text-gray-300 sm:text-3xl",
  deleteButton: "text-2xl text-red-500 hover:text-red-700",
};
