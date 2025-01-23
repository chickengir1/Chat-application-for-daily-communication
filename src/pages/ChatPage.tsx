import { useEffect } from "react";
import Input from "@/components/common/Input";
import useInput from "@/hooks/common/useInput";
import ChatWindow from "@/components/feature/chat/ChatWindow";
import ChatList from "@/components/feature/chat/ChatList";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import useChatRooms from "@/hooks/feature/chat/useChatRooms";
import { useChatNaviation } from "@/hooks/common/useNavigation";
import { useOverlay } from "@/hooks/common/useOverlay";
import UnselectedChat from "@/components/feature/chat/UnselectedChat";
import { useRoomList } from "@/hooks/api/useRoomList";

const ChatPage = () => {
  const { value: search, onChange: setSearch } = useInput("");
  const { rooms } = useRoomList();
  const { filteredRooms, filterRooms } = useChatRooms(rooms);
  const { selectedChatId, handleChatClick } = useChatNaviation();
  const { toggleOverlay, renderOverlay } = useOverlay();

  useEffect(() => {
    filterRooms(search);
  }, [search, filterRooms]);

  // 임시 데이터
  const tempChats = [
    {
      roomId: "This_is_Room_Id",
      roomName: "테스트용데이터",
      ownerId: "존 도",
      lastMessage: "마지막메세지입니다.",
      roomType: "GM",
      participants: ["존 도", "일론머스크"],
      createdAt: new Date().toISOString(),
    },
  ];

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
          {/*임시데이터 넣어놨음 filteredRooms로 수정해야함*/}
          <ChatList
            chats={tempChats}
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
  container: "flex h-screen flex-col p-2 md:flex-row md:p-0",
  chatListContainer: "hidden w-full flex-col space-y-4 py-6 md:flex md:w-2/5",
  searchContainer:
    "flex h-16 items-center rounded-lg bg-[#505050] px-2 text-white duration-200 ease-in-out hover:bg-[#404040]",
  searchIcon: "mx-2 text-gray-300",
  input:
    "w-full rounded-lg bg-transparent px-2 text-white placeholder-gray-400 outline-none",
  chatList:
    "h-full overflow-y-auto rounded-lg bg-[#505050] text-white transition-colors scrollbar-none",
  chatListHeader:
    "sticky top-0 z-5 bg-[#404040] py-4 text-center text-2xl font-bold",
  chatWindowContainer:
    "relative flex h-screen w-full flex-col pb-2 md:w-3/5 md:p-6",
  openButton:
    "fixed left-4 top-4 z-20 rounded-full bg-[#606060] p-4 text-white shadow-lg transition-all hover:bg-[#505050] md:hidden",
};

const mobileStyles = {
  closeButton:
    "absolute right-3 top-3 rounded-full bg-[#404040] p-3 text-white shadow-lg transition-all hover:bg-[#505050]",
  header:
    "border-b border-gray-500 bg-[#404040] py-4 text-center text-xl font-semibold",
};
