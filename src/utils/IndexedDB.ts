import { Message } from "@/stores/chatStore";
import { openDB, type IDBPDatabase } from "idb";
import { MAX_MESSAGE_COUNT } from "./Constans";

const DB_NAME = "chat-room";
const Store_NAME = "messages";

export const initIndexedDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db: IDBPDatabase) {
      if (!db.objectStoreNames.contains(Store_NAME)) {
        db.createObjectStore(Store_NAME, { keyPath: "roomId" });
      }
    },
  });
};

export const saveMessagesToDB = async (roomId: string, messages: Message[]) => {
  try {
    const db = await initIndexedDB();
    const tx = db.transaction(Store_NAME, "readwrite");
    const store = tx.objectStore(Store_NAME);

    const existingData = (await store.get(roomId)) || {
      roomId,
      messages: [],
    };

    const updatedMessages = {
      ...existingData,
      messages: [...existingData.messages, ...messages].slice(
        -MAX_MESSAGE_COUNT
      ),
    };

    await store.put(updatedMessages);
    await tx.done;
  } catch (error) {
    console.error("메시지 저장 중 오류 발생", error);
  }
};

export const loadMessagesFromDB = async (
  roomId: string
): Promise<Message[]> => {
  try {
    const db = await initIndexedDB();
    const data = await db.get(Store_NAME, roomId);
    return data?.messages || [];
  } catch (error) {
    console.error("메시지 로드 중 오류 발생", error);
    return [];
  }
};
