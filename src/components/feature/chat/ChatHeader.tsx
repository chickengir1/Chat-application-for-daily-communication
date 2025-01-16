import { FaSearch, FaEllipsisV, FaUserCircle } from "react-icons/fa";

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  avatarUrl?: string;
}

const ChatHeader = ({ title, subtitle, avatarUrl }: ChatHeaderProps) => {
  // 아바타 이미지가 있으면 이미지를, 없으면 기본 아이콘을 렌더링하는 조건문
  const avatarIcon = avatarUrl ? (
    <img src={avatarUrl} alt="Avatar" />
  ) : (
    <FaUserCircle className="mr-3 h-10 w-10 flex-shrink-0 text-[#ccc]" />
  );

  return (
    <div className={styles.header}>
      <div className={styles.leftContainer}>
        <div className={styles.avatarContainer}>{avatarIcon}</div>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <button className={styles.iconButton}>
          <FaSearch size={18} />
        </button>
        <button className={styles.iconButton}>
          <FaEllipsisV size={18} />
        </button>
      </div>
    </div>
  );
};

const styles = {
  header: "flex items-center justify-between bg-[#404040] text-white p-3",
  leftContainer: "flex items-center gap-3",
  avatarContainer: "w-10 h-10 bg-gray-500 rounded-full",
  title: "text-sm font-bold",
  subtitle: "text-xs text-gray-400",
  rightContainer: "flex items-center gap-4",
  iconButton: "text-gray-400 cursor-pointer transition-colors duration-300",
};

export default ChatHeader;
