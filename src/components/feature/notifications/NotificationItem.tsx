import { formatTime } from "@/hooks/feature/chat/RoomLists/useChatHandlers";
import { FaUserCircle, FaTrash } from "react-icons/fa";

interface NotificationItemProps {
  id: number;
  name: string;
  message: string;
  createdAt: string;
  read: boolean;
  onDelete?: () => void;
}

const NotificationItem = ({
  name,
  message,
  createdAt,
  onDelete,
}: NotificationItemProps) => {
  return (
    <li className={styles.listItem}>
      <div className={styles.leftContent}>
        <FaUserCircle className={styles.avatarIcon} />
        <div className={styles.textContainer}>
          <p className={styles.name}>{name}</p>
          <p className={styles.message}>{message}</p>
        </div>
      </div>
      <div className={styles.rightContent}>
        <p className={styles.createdAt}>{formatTime(createdAt)}</p>
        {onDelete && (
          <button className={styles.deleteButton} onClick={onDelete}>
            <FaTrash />
          </button>
        )}
      </div>
    </li>
  );
};

const styles = {
  listItem: "flex justify-between items-start p-4 border-b gap-4 w-full",
  leftContent: "flex items-start space-x-4 flex-1 min-w-0",
  rightContent: "flex items-center space-x-2 flex-shrink-0",
  avatarIcon: "text-4xl text-gray-200 flex-shrink-0",
  textContainer: "flex flex-col min-w-0 flex-1",
  name: "font-bold text-lg text-gray-50 truncate",

  message: "text-sm text-gray-50 line-clamp-2 break-all",
  createdAt: "text-sm text-gray-100 whitespace-nowrap",
  deleteButton: "text-red-500 hover:text-red-100 flex-shrink-0",
};
export default NotificationItem;
