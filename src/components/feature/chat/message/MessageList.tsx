import { memo, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { Message } from "@/stores/chatStore";
import { searchStore } from "@/stores/searchStore";
import { useChatScroll } from "@/hooks/feature/chat/useChatScroll";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList = memo(({ messages, currentUserId }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { query, isSearchActive } = searchStore();
  useChatScroll({
    messages,
    query,
    isSearchActive,
    containerRef,
    bottomRef,
  });

  return (
    <div ref={containerRef} className={style.container}>
      {messages.map((message) => {
        const isMatch = query
          ? message.message.toLowerCase().includes(query.toLowerCase())
          : false;
        return (
          <div
            key={message.id}
            className={`${isMatch ? style.highlight : ""} ${style.message}`}
          >
            <ChatBubble
              sender={message.sender}
              message={message.message}
              timestamp={message.createdAt}
              isCurrentUser={message.sender === currentUserId}
            />
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
});

export default MessageList;

const style = {
  container: "h-full flex-1 overflow-y-auto p-4 scrollbar-none",
  message: "my-2",
  highlight: "rounded-md bg-yellow-50 bg-opacity-50",
};
