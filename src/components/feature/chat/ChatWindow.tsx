import React from "react";
import ChatBubble from "@/components/feature/chat/ChatBubble";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  position: "left" | "right";
}

interface ChatWindowProps {
  messages: Message[];
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const ChatWindow = ({
  messages,
  inputValue,
  onInputChange,
  onKeyDown,
  onSend,
}: ChatWindowProps) => {
  return (
    <div className="w-full h-full bg-[#505050] rounded-lg flex flex-col overflow-hidden">
      <ChatHeader title={"일론머스크"} subtitle={"가즈아"} avatarUrl={""} />
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            timestamp={msg.timestamp}
            position={msg.position}
          />
        ))}
      </div>
      <MessageInput
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        onSend={onSend}
      />
    </div>
  );
};

export default ChatWindow;
