import { memo } from "react";
import ChatBubble from "./ChatBubble";
import { Message } from "@/stores/chatStore";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList = memo(({ messages, currentUserId }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          sender={message.sender}
          message={message.message}
          timestamp={message.createdAt}
          isCurrentUser={message.sender === currentUserId}
        />
      ))}
    </div>
  );
});

export default MessageList;
