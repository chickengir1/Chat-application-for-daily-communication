import GroupChat from "@/components/feature/chat/GroupChat";
import PersonalChat from "@/components/feature/chat/PersonalChat";
import Input from "@/components/common/Input";
import useInput from "@/hooks/common/useInput";
import ChatWindow from "@/components/feature/chat/ChatWindow";
import { groupChats, personalChats } from "@/utils/stub";
import { FaSearch } from "react-icons/fa";
import useChat from "@/hooks/feature/useChat";

const ChatPage = () => {
  const { value: search, onChange: setSearch } = useInput("");

  const { messages, inputValue, handleInputChange, handleKeyDown, handleSend } =
    useChat([
      {
        id: 1,
        sender: "일론머스크",
        text: "Hey There!",
        timestamp: "Today, 8:33 PM",
        position: "left",
      },
      {
        id: 2,
        sender: "me",
        text: "Hello!",
        timestamp: "Today, 8:34 PM",
        position: "right",
      },
    ]);

  const sectionStyle =
    "bg-[#505050] text-white rounded-lg p-4 scrollbar-none transition-colors";

  const inputStyle =
    "flex-1 bg-transparent placeholder-gray-400 text-white px-2 outline-none";

  const sectionHeight = {
    search: "h-[8%]",
    groupChat: "h-[40%]",
    personalChat: "h-[50%]",
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/5 flex flex-col p-6 space-y-4">
        <div
          className={`${sectionHeight.search} bg-[#505050] text-white flex items-center rounded-lg px-4`}
        >
          <FaSearch className="text-gray-300 mr-4" />
          <Input
            value={search}
            onChange={setSearch}
            placeholder="Search"
            className={inputStyle}
          />
        </div>
        <div
          className={`${sectionStyle} ${sectionHeight.groupChat} overflow-y-auto`}
        >
          <GroupChat chats={groupChats} />
        </div>
        <div
          className={`${sectionStyle} ${sectionHeight.personalChat} overflow-y-auto`}
        >
          <PersonalChat chats={personalChats} />
        </div>
      </div>
      <div className="w-3/5 flex flex-col p-6">
        <ChatWindow
          messages={messages}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onSend={handleSend}
        />
      </div>
    </div>
  );
};

export default ChatPage;
