import { useState } from "react";
import { Message } from "@/utils/chatInterface";

export default function useChat(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = (text: string = "", file?: File | null) => {
    let fileURL = "";

    if (file) {
      fileURL = URL.createObjectURL(file); // 임시 코드
    }

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "me",
        text: file ? "" : text,
        content: file ? fileURL : undefined,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        position: "right",
        type: file ? "file" : "text",
      },
    ]);
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage(inputValue);
    }
  };

  return {
    messages,
    inputValue,
    handleInputChange,
    handleKeyDown,
    sendMessage,
  };
}
