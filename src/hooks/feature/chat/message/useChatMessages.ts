import { useEffect } from "react";

import { loadMessagesFromDB } from "@/utils/IndexedDB";
import { chatStore } from "@/stores/chatStore";

const useChatMessages = (roomId: string) => {
  const { filterMessages } = chatStore();

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await loadMessagesFromDB(roomId);
      chatStore.getState().messages[roomId] = messages;
      filterMessages(roomId);
    };
    fetchMessages();
  }, [roomId, filterMessages]);

  return {
    filteredMessages: chatStore().filteredMessages,
  };
};

export default useChatMessages;
