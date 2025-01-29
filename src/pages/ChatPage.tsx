import { useEffect } from "react";
import Input from "@/components/common/Input";
import useInput from "@/hooks/common/useInput";
import ChatWindow from "@/components/feature/chat/room/ChatWindow";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import useChatRooms from "@/hooks/feature/chat/RoomLists/useChatRooms";
import { useChatNaviation } from "@/hooks/common/useNavigation";
import { useOverlay } from "@/hooks/common/useOverlay";
import UnselectedChat from "@/components/feature/chat/empty/UnselectedChat";
import { useRoomList } from "@/hooks/api/useRoomList";
import ChatList from "@/components/feature/chat/room/ChatList";

const ChatPage = () => {
  const { value: search, onChange: setSearch } = useInput("");
  const { rooms } = useRoomList();
  const { filteredRooms, filterRooms } = useChatRooms(rooms);
  const { selectedChatId, handleChatClick } = useChatNaviation();
  const { toggleOverlay, renderOverlay } = useOverlay();

  useEffect(() => {
    filterRooms(search);
  }, [search, filterRooms]);

  const mobileChatListContent = (
    <>
      <button className={mobileStyles.closeButton} onClick={toggleOverlay}>
        <FaTimes />
      </button>
      <h2 className={mobileStyles.header}>Chat Rooms</h2>
      <ChatList
        chats={filteredRooms}
        onChatClick={handleChatClick}
        selectedChatId={selectedChatId}
      />
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles.chatListContainer}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <Input
            value={search}
            onChange={setSearch}
            placeholder="채팅방 검색"
            className={styles.input}
          />
        </div>
        <div className={styles.chatList}>
          <h2 className={styles.chatListHeader}>Chat Rooms</h2>
          <ChatList
            chats={filteredRooms}
            onChatClick={handleChatClick}
            selectedChatId={selectedChatId}
          />
        </div>
      </div>
      <div className={styles.chatWindowContainer}>
        <button className={styles.openButton} onClick={toggleOverlay}>
          <FaBars />
        </button>
        {renderOverlay(mobileChatListContent)}
        {selectedChatId ? (
          <ChatWindow roomId={selectedChatId} />
        ) : (
          <UnselectedChat />
        )}
      </div>
    </div>
  );
};

export default ChatPage;

const styles = {
  container: "flex h-screen flex-col p-2 md:p-0 md:flex-row",
  chatListContainer: "hidden w-full flex-col space-y-4 py-6 md:w-2/5 md:flex",
  searchContainer:
    "flex h-16 items-center rounded-lg bg-[#505050] px-2 text-white hover:bg-[#404040] duration-200 ease-in-out",
  searchIcon: "mx-2 text-gray-300",
  input:
    "w-full rounded-lg bg-transparent px-2 text-white outline-none placeholder-gray-400",
  chatList:
    "h-full overflow-y-auto rounded-lg bg-[#505050] text-white scrollbar-none transition-colors",
  chatListHeader:
    "sticky top-0 z-5 bg-[#404040] py-4 text-center font-bold text-2xl",
  chatWindowContainer:
    "relative flex h-[calc(100vh-1rem)] w-full flex-col pb-2 md:w-3/5 md:min-h-screen md:p-6",
  openButton:
    "fixed left-4 top-4 z-20 rounded-full bg-[#606060] p-4 text-white shadow-lg hover:bg-[#505050] transition-all md:hidden",
};

const mobileStyles = {
  closeButton:
    "absolute right-3 top-3 rounded-full bg-[#404040] p-3 text-white shadow-lg hover:bg-[#505050] transition-all",
  header:
    "border-b border-gray-500 bg-[#404040] py-4 text-center font-semibold text-xl",
};
