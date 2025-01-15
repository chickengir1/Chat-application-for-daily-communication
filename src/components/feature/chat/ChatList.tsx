import { FaUserCircle } from "react-icons/fa";

interface ChatListProps {
  chats: {
    id: number;
    name: string;
    lastChat: string;
    createdAt: string;
  }[];
  onChatClick: (id: number) => void;
}

const ChatList = ({ chats, onChatClick }: ChatListProps) => {
  const hover =
    "cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#606060] hover:shadow-md hover:rounded-lg";

  const formatTime = (createdAt: string) =>
    new Date(createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="p-4">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`flex items-center mb-4 justify-between p-2 border-b border-gray-300 ${hover}`}
          onClick={() => onChatClick(chat.id)}
        >
          <FaUserCircle className="text-[#ccc] w-10 h-10 mr-3 flex-shrink-0" />
          <div className="flex items-center space-x-3 flex-1 overflow-hidden">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{chat.name}</h3>
              <p className="text-sm text-gray-300 truncate">{chat.lastChat}</p>
            </div>
          </div>
          <span className="text-sm text-gray-400 flex-shrink-0 ml-4">
            {formatTime(chat.createdAt)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
