import ChatList from "@/components/feature/chat/ChatList";
import FriendList from "@/components/feature/main/FriendList";
import UserList from "@/components/feature/main/UserList";
import { chatListData, friendListData, userListData } from "@/utils/stub";
import { useRef, useState } from "react";
import { FaAngleDown, FaAngleUp, FaSearch } from "react-icons/fa";

const HomePage = () => {
  const [friendList, setFriendList] = useState(false);
  const [userList, setUserList] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const friendListToggle = () => {
    setFriendList((prev) => !prev);
  };

  const userListToggle = () => {
    setUserList((prev) => !prev);
  };

  const handleUserSearchClick = () => {
    if (inputRef.current) {
      const value = inputRef.current.value;
      console.log("입력값:", value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      handleUserSearchClick();
    }
  };

  return (
    <div className="flex flex-col gap-[20px] h-[calc(100%-72px)] md:h-[100%] p-2 text-white md:pl-0 md:pr-6 md:py-6">
      <div className="flex flex-col sm:flex-row gap-[20px]">
        {/* 친구 목록 */}
        <div
          className={`sm:w-[50%] ${
            friendList ? "h-[30vh]" : "h-[64px]"
          } sm:h-[50vh] bg-[#505050] rounded-lg overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="flex items-center justify-between h-[64px] px-4 bg-[#404040]">
            <h2 className="sm:text-[18px] font-bold">친구 목록</h2>
            <button className="sm:hidden" onClick={friendListToggle}>
              {friendList ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </div>
          <div className="h-[calc(100%-64px)] p-4 overflow-auto">
            <FriendList friends={friendListData} />
          </div>
        </div>

        {/* 사용자 목록 */}
        <div
          className={`sm:w-[50%] ${
            userList ? "h-[30vh]" : "h-[64px]"
          } sm:h-[50vh] bg-[#505050] rounded-lg overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="flex items-center justify-between gap-[8px] h-[64px] px-4 bg-[#404040]">
            <h2 className="sm:text-[18px] font-bold whitespace-nowrap">사용자 목록</h2>
            <div className="flex gap-[16px]">
              <span className="relative">
                <input type="text" className="w-full h-[40px] px-2 bg-[#505050] rounded-lg" placeholder="사용자 검색" ref={inputRef} onKeyDown={handleKeyDown} />
                <button type="button" onClick={handleUserSearchClick}>
                  <FaSearch className="absolute right-[12px] top-[50%] translate-y-[-50%]" />
                </button>
              </span>
              <button className="sm:hidden" onClick={userListToggle}>
                {userList ? <FaAngleUp /> : <FaAngleDown />}
              </button>
            </div>
          </div>
          <div className="h-[calc(100%-64px)] p-4 overflow-auto">
            <UserList users={userListData} />
          </div>
        </div>
      </div>

      {/* 최근 대화 */}
      <div className="h-[100%] bg-[#505050] rounded-lg overflow-hidden">
        <h2 className="flex items-center justify-between h-[64px] px-4 bg-[#404040] sm:text-[18px] font-bold">
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
