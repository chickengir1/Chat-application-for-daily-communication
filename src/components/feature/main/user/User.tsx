import { useUser } from "@/hooks/api/useUser";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useDebounce } from "@/hooks/api/useDebounce";
import UserList from "../UserList";
import UserHeader from "./UserHeader";

const User = () => {
  const [search, setSearch] = useState("");

  const { users, page, searchUser, resetUsers } = useUser();

  useEffect(() => {
    if (search) {
      debouncedSearchUser();
    }
  }, [search]);

  const debouncedSearchUser = useDebounce(() => {
    searchUser({ search, page, size: 10 });
  }, 300);

  const handleSearch = (search: string) => {
    resetUsers();
    setSearch(search);
  };

  const handleScroll = () => {
    searchUser({ search, page: page + 1, size: 10 });
  };

  return (
    <section className={twMerge(styles.listContainer)}>
      <UserHeader search={search} onSearch={handleSearch} />
      <UserList users={users} onScroll={handleScroll} />
    </section>
  );
};

const styles = {
  listContainer:
    "sm:w-[50%] overflow-hidden rounded-lg bg-[#505050] transition-all duration-300 ease-in-out max-h-[50vh]",
};

export default User;
