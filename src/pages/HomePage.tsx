import { fetchData } from "@/api/apiExamples";
import Button from "@/components/common/Button";
import ChatList from "@/components/feature/chat/ChatList";
import CreateChatModal from "@/components/feature/main/CreateChatModal";
import FriendList from "@/components/feature/main/FriendList";
import UserList from "@/components/feature/main/UserList";
import { chatListData, friendListData, userListData } from "@/utils/stub";
import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface User {
  id: number;
  profileImg: string;
  username: string;
  statusMessage: string;
}

const HomePage = () => {
  const [friendList, setFriendList] = useState(false);
  const [userList, setUserList] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>(""); // 사용자 입력값
  const [debouncedValue, setDebouncedValue] = useState<string>(""); // 디바운싱된 값
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // 타이머 관리
  const [createChatModal, setCreateChatModal] = useState(false);

  // 입력값 변경 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // 기존 타이머 초기화
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // 새로운 타이머 설정
    debounceTimeout.current = setTimeout(() => {
      setDebouncedValue(value); // 디바운싱된 값 업데이트
    }, 1000);
  };

  // 디바운싱된 값으로 작업 (예: API 호출)
  useEffect(() => {
    if (debouncedValue) {
      console.log("디바운싱된 검색어:", debouncedValue);
      // 여기에 API 호출 로직 추가
    }
  }, [debouncedValue]);

  const toggleFriendList = () => {
    setFriendList((prev) => !prev);
  };

  const toggleUserList = () => {
    setUserList((prev) => !prev);
  };

  const [users, setUsers] = useState<User[] | null>(null);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetchData<User[]>("/api/users/search");
      if (response) {
        setUsers(response);
      } else {
        // setError("사용자 목록을 가져오는 데 실패했습니다.");
      }
    };

    getUsers();
  }, []);
  console.log(users);

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          {/* 친구 목록 */}
          <div
            className={`${styles.listContainer} ${friendList ? "h-[30vh]" : "h-[64px]"}`}
          >
            <div className={styles.listHeader}>
              <h2 className={styles.listTitle}>친구 목록</h2>
              <div className={styles.headerButtons}>
                <Button
                  text="채팅하기"
                  onClick={() => {
                    setCreateChatModal(true);
                  }}
                />
                <button className="sm:hidden" onClick={toggleFriendList}>
                  {friendList ? <FaAngleUp /> : <FaAngleDown />}
                </button>
              </div>
            </div>
            <div className={styles.listBody}>
              <FriendList friends={friendListData} />
            </div>
          </div>

          {/* 사용자 목록 */}
          <div
            className={`${styles.listContainer} ${userList ? "h-[30vh]" : "h-[64px]"}`}
          >
            <div className={styles.listHeader}>
              <h2 className={styles.listTitle}>사용자 목록</h2>
              <div className={styles.headerButtons}>
                <span className={styles.searchInputWrapper}>
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="사용자 검색"
                    value={searchTerm}
                    onChange={handleInputChange}
                  />
                </span>
                <button className="sm:hidden" onClick={toggleUserList}>
                  {userList ? <FaAngleUp /> : <FaAngleDown />}
                </button>
              </div>
            </div>
            <div className={styles.listBody}>
              <UserList users={userListData} />
            </div>
          </div>
        </div>

        {/* 최근 대화 */}
        <div className={styles.chatContainer}>
          <h2 className={styles.chatHeader}>최근 대화</h2>
          <div className={styles.chatBody}>
            <ChatList chats={chatListData} />
          </div>
        </div>
      </div>
      {createChatModal && (
        <CreateChatModal
          isOpen={createChatModal}
          onClose={() => setCreateChatModal(false)}
        />
      )}
    </>
  );
};

export default HomePage;

const styles = {
  pageContainer:
    "flex h-[calc(100%-72px)] flex-col gap-[20px] p-2 text-white md:h-[100%] md:py-6 md:pl-0 md:pr-6",
  contentWrapper: "flex flex-col gap-[20px] sm:flex-row",
  listContainer:
    "sm:w-[50%] overflow-hidden rounded-lg bg-[#505050] transition-all duration-300 ease-in-out sm:h-[50vh]",
  listHeader:
    "flex gap-[8px] h-[64px] items-center justify-between bg-[#404040] px-4",
  listTitle: "font-bold sm:text-[18px] whitespace-nowrap",
  headerButtons: "flex gap-[16px]",
  listBody: "h-[calc(100%-64px)] overflow-auto p-4",
  searchInputWrapper: "relative",
  searchInput: "h-[40px] w-full rounded-lg bg-[#505050] px-2",
  chatContainer: "h-[100%] overflow-hidden rounded-lg bg-[#505050]",
  chatHeader:
    "flex h-[64px] items-center justify-between bg-[#404040] px-4 font-bold sm:text-[18px]",
  chatBody: "h-[calc(100%-64px)] overflow-auto",
};
