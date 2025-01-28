import { useState, useEffect } from "react";
import { FaSearch, FaEllipsisV, FaUserCircle, FaTimes } from "react-icons/fa";
import Input from "@/components/common/Input";
import useInput from "@/hooks/common/useInput";

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  avatarUrl?: string;
  onOptionsClick?: () => void;
}

const ChatHeader = ({
  title,
  subtitle,
  avatarUrl,
  onOptionsClick,
}: ChatHeaderProps) => {
  const [isSearchActive, setSearchActive] = useState(false);
  const { value: search, onChange: setSearch } = useInput("");

  // 디바운싱 로직 구현하고 API 요청 보내야함
  useEffect(() => {
    if (search) {
      // setDebouncedSearch(search); // 디바운싱된 값으로 변경
      console.log("요청 보낼 밸류 및 디바운싱 로직 구현해야함 ", search);
    }
  }, [search]);

  const onSearchToggle = (state: boolean) => () => {
    setSearchActive(state);
  };

  const avatarIcon = avatarUrl ? (
    <img src={avatarUrl} alt="Avatar" className={styles.avatarImage} />
  ) : (
    <FaUserCircle className={styles.avatarIcon} />
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
        <div className={styles.searchContainer}>
          {!isSearchActive && (
            <button
              className={styles.iconButton}
              onClick={onSearchToggle(true)}
            >
              <FaSearch size={22} />
            </button>
          )}
          <div
            className={`${styles.inputWrapper} ${
              isSearchActive ? styles.inputActive : styles.inputHidden
            }`}
          >
            <Input
              value={search}
              placeholder="채팅 검색"
              className={styles.searchInput}
              onChange={setSearch}
            />
            <button
              className={styles.iconButton}
              onClick={onSearchToggle(false)}
            >
              <FaTimes size={22} />
            </button>
          </div>
        </div>
        <button className={styles.iconButton} onClick={onOptionsClick}>
          <FaEllipsisV size={22} />
        </button>
      </div>
    </div>
  );
};

const styles = {
  header: "flex items-center justify-between bg-[#404040] text-white p-3",
  leftContainer: "flex items-center gap-3",
  avatarContainer: "w-10 h-10",
  avatarIcon: "text-[#ccc] h-10 w-10",
  avatarImage: "rounded-full object-cover h-full w-full",
  title: "text-sm font-bold max-w-[200px] md:min-w-[412px] truncate",
  subtitle: "text-xs text-gray-400",
  rightContainer: "flex items-center gap-4",
  iconButton:
    "text-gray-400 cursor-pointer transition-colors duration-300 hover:text-white",
  searchContainer: "flex items-center gap-2 relative",
  inputWrapper:
    "absolute right-0 flex items-center gap-2 transition-all duration-300 ease-in-out",
  inputActive: "opacity-100 scale-100 pointer-events-auto",
  inputHidden: "opacity-0 scale-95 pointer-events-none",
  searchInput:
    "h-9 rounded-md bg-[#ccc] px-2 py-1 text-sm text-black placeholder-gray-500 outline-none",
};

export default ChatHeader;
