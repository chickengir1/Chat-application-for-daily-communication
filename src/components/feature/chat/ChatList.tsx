import { FaUserCircle } from "react-icons/fa";
import useChatHandlers from "@/hooks/feature/chat/useChatHandlers";

interface ChatListProps {
  chats: {
    id: number;
    name: string;
    lastChat: string;
    createdAt: string;
  }[];
  onChatClick?: (id: number) => void;
  selectedChatId?: number;
}

const ChatList = ({ chats, onChatClick, selectedChatId }: ChatListProps) => {
  const { handleChatClicked, formatTime } = useChatHandlers(chats, onChatClick);

  return (
    <div className="p-4">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`${styles.chatRoom} ${
            chat.id === selectedChatId ? styles.selected : styles.hover
          }`}
          onClick={handleChatClicked(chat.id)}
        >
          <FaUserCircle className={styles.icon} />
          <div className={styles.chatInfo}>
            <div className={styles.chatText}>
              <h3 className={styles.chatName}>{chat.name}</h3>
              <p className={styles.chatLastMessage}>{chat.lastChat}</p>
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
  chatRoom:
    "flex items-center mb-4 justify-between p-2 border-b border-gray-300",
  hover:
    "cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#606060] hover:shadow-md hover:rounded-lg",
  selected: "bg-[#404040] shadow-md rounded",
  icon: "text-[#ccc] w-10 h-10 mr-3 flex-shrink-0",
  chatInfo: "flex items-center space-x-3 flex-1 overflow-hidden",
  chatText: "flex-1 min-w-0",
  chatName: "font-semibold truncate",
  chatLastMessage: "text-sm text-gray-300 truncate",
  chatTime: "text-sm text-gray-400 flex-shrink-0 ml-4",
};
