import { useEffect } from "react";
import Input from "@/components/common/Input";
import useInput from "@/hooks/common/useInput";
import ChatWindow from "@/components/feature/chat/ChatWindow";
import ChatList from "@/components/feature/chat/ChatList";
import { FaSearch } from "react-icons/fa";
import useChatRooms from "@/hooks/feature/chat/useChatRooms";
import { chatListData } from "@/utils/stub";
import { useChatNaviation } from "@/hooks/common/useNavigation";
import NoneClickChat from "@/components/feature/chat/NoneClickChat";

const ChatPage = () => {
  const { value: search, onChange: setSearch } = useInput("");
  const { filteredRooms, filterRooms } = useChatRooms(chatListData);
  const { selectedChatId, handleChatClick } = useChatNaviation();

  useEffect(() => {
    filterRooms(search);
  }, [search, filterRooms]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.searchBar}>
          <FaSearch className="mx-2 text-gray-300" />
          <Input
            value={search}
            onChange={setSearch}
            placeholder="채팅방 검색"
            className={styles.input}
          />
        </div>
        <div className={styles.chatListContainer}>
          <h2 className={styles.chatListHeader}>Chat Rooms</h2>
          <ChatList
            chats={filteredRooms}
            onChatClick={handleChatClick}
            selectedChatId={selectedChatId}
          />
        </div>
      </div>
      <div className={styles.chatWindow}>
        {selectedChatId ? <ChatWindow /> : <NoneClickChat />}
      </div>
    </div>
  );
};

export default ChatPage;

const styles = {
  container: "md:p-0 p-2 flex flex-col md:flex-row h-screen",
  sidebar: "w-full md:w-2/5 flex-col py-6 space-y-4 hidden md:flex",
  searchBar:
    "h-16 bg-[#505050] text-white rounded-lg hover:bg-[#404040] duration-200 ease-in-out flex items-center px-2",
  input:
    "w-full bg-transparent placeholder-gray-400 text-white px-2 outline-none rounded-lg",
  chatListContainer:
    "bg-[#505050] text-white rounded-lg scrollbar-none transition-colors h-full overflow-y-auto",
  chatListHeader:
    "sticky top-0 z-10 bg-[#404040] text-center text-2xl font-bold py-4",
  chatWindow: "w-full h-screen md:w-3/5 flex flex-col md:p-6",
};
