import { useStore } from "zustand";
import { chatStore } from "@/stores/chatStore";
import { useMemo } from "react";

const useChatMessages = (roomId: string) => {
  const store = useStore(chatStore);
  const messages = useMemo(
    () => store.messages[roomId] || [],
    [store.messages, roomId]
  );

  return {
    filteredMessages: messages,
  };
};

export default useChatMessages;
