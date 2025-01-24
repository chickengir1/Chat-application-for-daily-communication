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
      <div className={styles.content}>
        <FaUserCircle className={styles.avatarIcon} />
        <div className={styles.textContainer}>
          <p className={styles.name}>{name}</p>
          <p className={styles.message}>{message}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <p className={styles.createdAt}>
          {new Date(createdAt).toLocaleString()}
        </p>
        {onDelete && (
          <button className={styles.deleteButton} onClick={onDelete}>
            <FaTrash />
          </button>
        )}
      </div>
    </li>
  );
};

export default NotificationItem;

const styles = {
  listItem: "flex justify-between items-center p-4 border-b",
  content: "flex items-center space-x-4",
  avatarIcon: "text-4xl text-gray-200",
  textContainer: "flex flex-col",
  name: "font-bold text-lg text-gray-50",
  message: "text-sm text-gray-50",
  actions: "flex items-center space-x-4",
  createdAt: "text-sm text-gray-100",
  deleteButton: "text-red-500 hover:text-red-100",
};
