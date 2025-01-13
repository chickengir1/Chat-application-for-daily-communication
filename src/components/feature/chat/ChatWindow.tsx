import React, { useEffect, useRef } from "react";
import ChatBubble from "@/components/feature/chat/ChatBubble";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { Message } from "@/utils/chatInterface";

interface ChatWindowProps {
  messages: Message[];
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  sendMessage: (text: string, file?: File | null) => void;
}

const ChatWindow = ({
  messages,
  inputValue,
  onInputChange,
  onKeyDown,
  sendMessage,
}: ChatWindowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <div className="w-full h-full bg-[#505050] rounded-lg flex flex-col overflow-hidden">
      <ChatHeader title="Elon Musk" subtitle="Going to Mars" avatarUrl="" />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 scrollbar-none"
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} {...msg} />
        ))}
      </div>
      <MessageInput
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatWindow;
