import { useState } from "react";

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  position: "left" | "right";
}

export default function useChat(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = (text: string) => {
    // 나중에 서버 통신 / 소켓 로직 추가 해야함
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "me",
        text,
        timestamp: new Date().toLocaleTimeString(),
        position: "right",
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return {
    messages,
    inputValue,
    handleInputChange,
    handleKeyDown,
    handleSend,
  };
}
