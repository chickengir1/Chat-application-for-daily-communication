import { fetchData } from "@/api/apiExamples";
import ChatList from "@/components/feature/chat/ChatList";
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
    <div className="flex h-[calc(100%-72px)] flex-col gap-[20px] p-2 text-white md:h-[100%] md:py-6 md:pl-0 md:pr-6">
      <div className="flex flex-col gap-[20px] sm:flex-row">
        {/* 친구 목록 */}
        <div
          className={`sm:w-[50%] ${
            friendList ? "h-[30vh]" : "h-[64px]"
          } overflow-hidden rounded-lg bg-[#505050] transition-all duration-300 ease-in-out sm:h-[50vh]`}
        >
          <div className="flex h-[64px] items-center justify-between bg-[#404040] px-4">
            <h2 className="font-bold sm:text-[18px]">친구 목록</h2>
            <button className="sm:hidden" onClick={toggleFriendList}>
              {friendList ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </div>
          <div className="h-[calc(100%-64px)] overflow-auto p-4">
            <FriendList friends={friendListData} />
          </div>
        </div>

        {/* 사용자 목록 */}
        <div
          className={`sm:w-[50%] ${
            userList ? "h-[30vh]" : "h-[64px]"
          } overflow-hidden rounded-lg bg-[#505050] transition-all duration-300 ease-in-out sm:h-[50vh]`}
        >
          <div className="flex h-[64px] items-center justify-between gap-[8px] bg-[#404040] px-4">
            <h2 className="whitespace-nowrap font-bold sm:text-[18px]">
              사용자 목록
            </h2>
            <div className="flex gap-[16px]">
              <span className="relative">
                <input
                  type="text"
                  className="h-[40px] w-full rounded-lg bg-[#505050] px-2"
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
          <div className="h-[calc(100%-64px)] overflow-auto p-4">
            <UserList users={userListData} />
          </div>
        </div>
      </div>

      {/* 최근 대화 */}
      <div className="h-[100%] overflow-hidden rounded-lg bg-[#505050]">
        <h2 className="flex h-[64px] items-center justify-between bg-[#404040] px-4 font-bold sm:text-[18px]">
          최근 대화
        </h2>
        <div className="h-[calc(100%-64px)] overflow-auto">
          <ChatList chats={chatListData} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
