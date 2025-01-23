import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import ChatBubble from "./ChatBubble";
import { messageStore } from "@/stores/messageStore";
import { roomStore } from "@/stores/roomStore";
import Modal from "@/components/common/Modal";
import useWebSocket from "@/hooks/feature/useWebSocket";

interface ChatWindowProps {
  roomId: string;
}
const wsBaseUrl = "ws://34.47.79.162:8080";

const ChatWindow = ({ roomId }: ChatWindowProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { title, subtitle, participants: people } = roomStore();
  const { filteredMessages, filterMessages } = messageStore();
  const { connect, disconnect } = useWebSocket(wsBaseUrl);

  useEffect(() => {
    filterMessages(roomId);
    connect(roomId);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const handleModalState = (state: boolean) => () => {
    setModalOpen(state);
  };

  const participants = people.map((person: string) => person);

  const currentUserId = "존 도"; // 유저 스토어에서 가져와야함

  return (
    <div className="mb-16 flex h-full w-full flex-col overflow-hidden rounded-lg bg-[#505050] md:mb-0">
      <ChatHeader
        title={title}
        subtitle={subtitle}
        onOptionsClick={handleModalState(true)}
      />
      <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
        {filteredMessages.map((message) => (
          <ChatBubble
            key={`${message.roomid} - ${message.createdAt}`}
            sender={message.nickname}
            message={message.message}
            timestamp={message.createdAt}
            isCurrentUser={message.nickname === currentUserId}
          />
        ))}
      </div>
      <MessageInput roomId={roomId} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalState(false)}
        overlayClassName={modalStyles.overlayClassName}
        contentClassName={modalStyles.contentClassName}
      >
        <div className={modalStyles.modalContent}>
          <h2 className={modalStyles.modalHeader}>채팅방 정보</h2>
          <div className={modalStyles.participantContainer}>
            <h2 className={modalStyles.listHeader}>참여자 목록</h2>
            {participants.map((participant, index) => (
              <div key={index} className={modalStyles.participantItem}>
                {participant}
              </div>
            ))}
          </div>
          <button
            onClick={() => disconnect(roomId)}
            className={modalStyles.leaveButton}
          >
            채팅방 나가기
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ChatWindow;

const modalStyles = {
  overlayClassName:
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center",
  contentClassName:
    "bg-[#404040] p-6 rounded-lg text-white w-11/12 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4",
  modalContent: "text-center",
  modalHeader: "text-lg font-bold mb-4",
  participantContainer:
    "grid grid-cols-2 gap-4 mt-4 max-h-60 overflow-y-auto scrollbar-none scrollbar-thumb-gray-500",
  listHeader: "text-md text-center font-bold col-span-2",
  participantItem:
    "rounded-lg bg-[#505050] p-2 text-sm font-medium text-white truncate",
  leaveButton:
    "mt-4 w-full rounded-lg bg-red-500 py-2 text-center text-white hover:bg-red-600",
};
