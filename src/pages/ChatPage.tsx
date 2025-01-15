import { useEffect } from "react";
import Input from "@/components/common/Input";
import useInput from "@/hooks/common/useInput";
import ChatWindow from "@/components/feature/chat/ChatWindow";
import ChatList from "@/components/feature/chat/ChatList";
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import useChatRooms from "@/hooks/feature/chat/useChatRooms";
import { chatListData, chatData } from "@/utils/stub";
import useSelectedChatRoom from "@/hooks/feature/chat/useSelectedChatRoom";

const ChatPage = () => {
  const { value: search, onChange: setSearch } = useInput("");
  const { filteredRooms, filterRooms } = useChatRooms(chatListData);
  const { selectedChatId, handleChatClick, roomName, participantCount } =
    useSelectedChatRoom(chatListData, chatData);

  useEffect(() => {
    filterRooms(search);
  }, [search, filterRooms]);

  const currentUserId = 1; // 현재 로그인 유저(개발 해야함)

  // 스타일
  const sectionStyle =
    "bg-[#505050] text-white rounded-lg scrollbar-none transition-colors";
  const inputStyle =
    "w-full bg-transparent placeholder-gray-400 text-white px-2 outline-none rounded-lg";
  const hover = "hover:bg-[#404040] duration-200 ease-in-out";
  const sectionHeight = { search: "h-16", chatSections: "h-[70%]" };
  const headerStyle =
    "sticky top-0 z-10 bg-[#404040] text-center text-2xl font-bold py-4";
  const chatSectionStyle = `${sectionStyle} ${sectionHeight.chatSections} h-full overflow-y-auto scrollbar-none`;

  return (
    <div className="md:p-0 p-2 flex flex-col md:flex-row h-screen">
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
          <h2 className={headerStyle}>Chat Rooms</h2>
          <ChatList chats={filteredRooms} onChatClick={handleChatClick} />
        </div>
      </div>
      <div className="w-full h-screen md:w-3/5 flex flex-col md:p-6">
        {selectedChatId ? (
          <ChatWindow
            chatData={chatData}
            currentUserId={currentUserId}
            title={roomName}
            subtitle={`${participantCount}명`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="bg-[#404040] text-[#888] p-4 rounded-full">
              <FaPlusCircle className="w-16 h-16" />
            </div>
            <h2 className="text-2xl font-bold text-gray-600">
              채팅방을 선택해주세요
            </h2>
            <p className="text-gray-700 text-center max-w-md">
              대화에 참여하려면 왼쪽 목록에서 채팅방을 선택하세요. 선택된
              채팅방의 메시지가 여기 표시됩니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
