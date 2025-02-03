import { FaUserCircle } from "react-icons/fa";
import useChatHandlers from "@/hooks/feature/chat/RoomLists/useChatHandlers";
import EmptyChatList from "../empty/EmptyChatList";

interface ChatListProps {
  chats: {
    roomId: string;
    roomName: string;
    ownerId: string;
    lastMessage: string;
    roomType: string;
    participants: string[];
    createdAt: string;
  }[];
  onChatClick?: (id: string) => void;
  selectedChatId?: string;
}

const ChatList = ({ chats, onChatClick, selectedChatId }: ChatListProps) => {
  const { handleChatClicked, formatTime } = useChatHandlers(chats, onChatClick);

  if (chats.length === 0) {
    return <EmptyChatList />;
  }

  return (
    <div className={styles.container}>
      {chats.map((chat) => (
        <div
          key={chat.roomId}
          className={`${styles.chatRoom} ${
            chat.roomId === selectedChatId ? styles.selected : styles.hover
          }`}
          onClick={handleChatClicked(chat.roomId)}
        >
          <div className={styles.contentWrapper}>
            <FaUserCircle className={styles.icon} />
            <div className={styles.chatInfo}>
              <div className={styles.chatText}>
                <h3 className={styles.chatName}>{chat.roomName}</h3>
                <p className={styles.chatLastMessage}>{chat.lastMessage}</p>
              </div>
            </div>
          </div>
          <span className={styles.chatTime}>{formatTime(chat.createdAt)}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatList;

const styles = {
  container: "p-4 w-full max-w-full",
  chatRoom:
    "flex items-center mb-4 justify-between p-2 border-b border-gray-300 w-full",
  contentWrapper: "flex items-center flex-1 min-w-0 mr-2",
  hover:
    "cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#606060] hover:shadow-md hover:rounded-lg",
  selected: "bg-[#404040] shadow-md rounded",
  icon: "text-[#ccc] w-10 h-10 mr-3 flex-shrink-0",
  chatInfo: "flex items-center flex-1 min-w-0",
  chatText: "flex-1 min-w-0",
  chatName: "font-semibold truncate text-base",
  chatLastMessage: "text-sm text-gray-300 truncate max-w-[350px]",
  chatTime: "text-sm text-gray-400 flex-shrink-0 ml-2 whitespace-nowrap",
};
