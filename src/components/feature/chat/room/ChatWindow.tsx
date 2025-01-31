import ChatHeader from "./ChatHeader";
import MessageInput from "../message/MessageInput";
import MessageList from "../message/MessageList";
import { roomStore } from "@/stores/roomStore";
import Modal from "@/components/common/Modal";
import useWebSocket from "@/hooks/feature/webSocket/useWebSocket";
import useChatMessages from "@/hooks/feature/chat/message/useChatMessages";
import useModalState from "@/hooks/common/useModalState";
import { WebSocketProvider } from "@/providers/webSocketProvider";
import { useMe } from "@/hooks/api/useMe";
import { useEffect } from "react";
import { userStore } from "@/stores/userStore";

interface ChatWindowProps {
  roomId: string;
}

const ChatWindow = ({ roomId }: ChatWindowProps) => {
  return (
    <WebSocketProvider>
      <ChatWindowContent roomId={roomId} />
    </WebSocketProvider>
  );
};

const ChatWindowContent = ({ roomId }: ChatWindowProps) => {
  const title = roomStore((state) => state.title);
  const subtitle = roomStore((state) => state.subtitle);
  const participants = roomStore((state) => state.participants);
  const { disconnect } = useWebSocket(roomId);
  const { filteredMessages } = useChatMessages(roomId);
  const { isModalOpen, handleModalState } = useModalState();
  const { getProfile } = useMe();
  const { profile } = userStore();

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const currentUserId = profile.nickname;

  const handleLeaveRoom = () => {
    disconnect();
  };

  return (
    <div className="mb-16 flex h-full w-full flex-col overflow-hidden rounded-lg bg-[#505050] md:mb-0 md:max-h-full">
      <ChatHeader
        title={title}
        subtitle={subtitle}
        onOptionsClick={handleModalState(true)}
      />
      <MessageList messages={filteredMessages} currentUserId={currentUserId} />
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
          <button onClick={handleLeaveRoom} className={modalStyles.leaveButton}>
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
