import Input from "@/components/common/Input";
import useInput from "@/hooks/common/useInput";
import ChatWindow from "@/components/feature/chat/ChatWindow";
import { chatData as messages, groupChats, personalChats } from "@/utils/stub";
import { FaSearch } from "react-icons/fa";
import ChatList from "@/components/feature/chat/ChatList";

const ChatPage = () => {
  const { value: search, onChange: setSearch } = useInput("");
  const chatData = messages.map(({ sender, userId, message, createdAt }) => ({
    sender,
    userId,
    message,
    createdAt,
  }));

  const currentUserId = 1; // 상태관리 로직에서 가져와야 하는 정보

  // 스타일 변수
  const sectionStyle =
    "bg-[#505050] text-white rounded-lg scrollbar-none transition-colors";

  const inputStyle =
    "w-full bg-transparent placeholder-gray-400 text-white px-2 outline-none rounded-lg";

  const hover = "hover:bg-[#404040] duration-200 ease-in-out";

  const sectionHeight = {
    search: "h-16",
    chatSections: "h-[50%]",
  };

  const headerStyle =
    "sticky top-0 z-10 bg-[#404040] text-center text-2xl font-bold py-4";

  const chatSectionStyle = `${sectionStyle} ${sectionHeight.chatSections} overflow-y-auto`;

  return (
    <div className="md:p-0 p-2 flex flex-col md:flex-row h-screen">
      {/* 왼쪽 섹션 */}
      <div className="w-full md:w-2/5 flex-col py-6 space-y-4 hidden md:flex">
        <div
          className={`${sectionHeight.search} ${sectionStyle} ${hover} flex items-center px-2`}
        >
          <FaSearch className="text-gray-300 mx-2" />
          <Input
            value={search}
            onChange={setSearch}
            placeholder="채팅방 검색"
            className={inputStyle}
          />
        </div>
        <div className={chatSectionStyle}>
          <h2 className={headerStyle}>{"Group Chat"}</h2>
          <ChatList chats={groupChats} />
        </div>
        <div className={chatSectionStyle}>
          <h2 className={headerStyle}>{"Personal Chat"}</h2>
          <ChatList chats={personalChats} />
        </div>
      </div>

      {/* 오른쪽 섹션 */}
      <div className="w-full h-screen md:w-3/5 flex flex-col md:p-6">
        <ChatWindow chatData={chatData} currentUserId={currentUserId} />
      </div>
    </div>
  );
};

export default ChatPage;
