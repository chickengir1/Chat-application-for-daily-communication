import { useRef } from "react";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";

interface ChatWindowProps {
  currentUserId: number;
  title: string;
  subtitle?: string;
  chatData: {
    sender: string;
    userId: number;
    message: string;
    createdAt: string;
  }[];
}

const ChatWindow = ({
  chatData,
  currentUserId,
  title,
  subtitle,
}: ChatWindowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const isCurrentUser = (userId: number): boolean => userId === currentUserId;

  return (
    <div className="w-full h-full bg-[#505050] rounded-lg flex flex-col overflow-hidden mb-16 md:mb-0">
      <ChatHeader title={title} subtitle={subtitle} />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 scrollbar-none"
      >
        {chatData.map((data, index) => (
          <ChatBubble
            key={`${data.userId}-${data.createdAt}-${index}`}
            sender={data.sender}
            message={data.message}
            timestamp={data.createdAt}
            isCurrentUser={isCurrentUser(data.userId)}
          />
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatWindow;
