import { useCallback } from "react";
import { chatStore } from "@/stores/chatStore";

const useChatMessages = (roomId: string) => {
  const messages = chatStore(
    useCallback((state) => state.messages[roomId] || [], [roomId])
  );

  return {
    filteredMessages: messages,
  };
};

export default useChatMessages;
