import { ChangeEventHandler, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface UserHeaderProps {
  search: string;
  onSearch: (search: string) => void;
}

const UserHeader = ({ search, onSearch }: UserHeaderProps) => {
  const [open, setOpen] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newSearch = e.target.value;

    onSearch(newSearch);
  };

  const handleToggleList = () => {
    setOpen(!open);
  };

  return (
    <article className={styles.listHeader}>
      <h2 className={styles.listTitle}>사용자 목록</h2>
      <div className={styles.headerButtons}>
        <span className={styles.searchInputWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="사용자 검색"
            value={search}
            onChange={handleChange}
          />
        </span>
        <button className="sm:hidden" onClick={handleToggleList}>
          {open ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>
    </article>
  );
};

const styles = {
  listHeader:
    "flex gap-[8px] h-[64px] items-center justify-between bg-[#404040] px-4",
  listTitle: "font-bold sm:text-[18px] whitespace-nowrap",
  headerButtons: "flex gap-[16px]",
  searchInputWrapper: "relative",
  searchInput: "h-[40px] w-full rounded-lg bg-[#505050] px-2",
};

export default UserHeader;
