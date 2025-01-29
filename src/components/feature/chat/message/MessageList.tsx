import { memo, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import { Message } from "@/stores/chatStore";
import { searchStore } from "@/stores/searchStore";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList = memo(({ messages, currentUserId }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { query, isSearchActive } = searchStore();

  useEffect(() => {
    if (query) {
      const firstMatch = document.querySelector(`.${styles.highlight}`);
      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else if (!isSearchActive) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [query, messages.length, isSearchActive]);

  return (
    <div className={styles.container}>
      {messages.map((message) => {
        const search =
          query && message.message.toLowerCase().includes(query.toLowerCase());
        return (
          <div key={message.id} className={search ? styles.highlight : ""}>
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

const styles = {
  container: "flex-1 overflow-y-auto p-4 scrollbar-none",
  highlight: "bg-yellow-50 bg-opacity-10 rounded-md",
};
