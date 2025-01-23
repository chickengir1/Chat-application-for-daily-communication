// import { fetchData } from "@/api/apiExamples";
import { axiosInstance } from "@/api/axiosInstance";
import Button from "@/components/common/Button";
import ChatList from "@/components/feature/chat/ChatList";
import CreateChatModal from "@/components/feature/main/CreateChatModal";
import FriendList from "@/components/feature/main/FriendList";
import UserList from "@/components/feature/main/UserList";
import { useRoomList } from "@/hooks/api/useRoomList";
import useChatRooms from "@/hooks/feature/chat/useChatRooms";
import { friendListData } from "@/utils/stub";
import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface User {
  userId: number;
  nickname: string;
  email: string;
  profileImg: string;
}

const HomePage = () => {
  const [friendList, setFriendList] = useState(false);
  const [userList, setUserList] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>(""); // 사용자 입력값
  const [debouncedValue, setDebouncedValue] = useState<string>(""); // 디바운싱된 값
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]); // 검색된 사용자 목록
  const [error, setError] = useState<string | null>(null); // 에러 메시지 관리
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // 타이머 관리
  const [createChatModal, setCreateChatModal] = useState(false);
  const { rooms } = useRoomList(); // 나중에 ,isLoading, error,refetch 추가 해서 써주세요
  const { filteredRooms } = useChatRooms(rooms);

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

  // 사용자 검색 -> 디바운싱된 값으로 API 호출
  useEffect(() => {
    console.log("Debounced Value:", debouncedValue);
    console.log("컴파일 에러 방지", error); // 컴파일 에러 방지용

    const fetchUsers = async () => {
      if (!debouncedValue) {
        setSearchedUsers([]); // 검색어가 없으면 초기화
        return;
      }

      try {
        const response = await axiosInstance.get(
          `/api/users/search?nickname=${debouncedValue}&page=0&size=10`
        );

        setSearchedUsers(response.data.content); // 검색된 사용자 목록 업데이트
        setError(null); // 에러 초기화
      } catch (err) {
        if (err instanceof Error) {
          // Error 타입으로 체크
          console.error("API 호출 에러:", err.message);
          setError("사용자 검색 중 에러가 발생했습니다.");
        } else {
          console.error("알 수 없는 에러:", err);
          setError("알 수 없는 에러가 발생했습니다.");
        }
      }
    };

    fetchUsers();
    // 디펜던시 워닝때문에 추가
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

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
                <button
                  className="sm:hidden"
                  onClick={() => {
                    setFriendList(!friendList);
                  }}
                >
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
                <button
                  className="sm:hidden"
                  onClick={() => {
                    setUserList(!userList);
                  }}
                >
                  {userList ? <FaAngleUp /> : <FaAngleDown />}
                </button>
              </div>
            </div>
            <div className={styles.listBody}>
              <UserList users={searchedUsers} />
            </div>
          </div>
        </div>

        {/* 최근 대화 */}
        <div className={styles.chatContainer}>
          <h2 className={styles.chatHeader}>최근 대화</h2>
          <div className={styles.chatBody}>
            <ChatList chats={filteredRooms} />
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
