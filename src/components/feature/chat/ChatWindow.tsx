import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import ChatBubble from "./ChatBubble";
import { messageStore } from "@/stores/messageStore";
import { roomStore } from "@/stores/roomStore";

const ChatWindow = () => {
  const { title, subtitle } = roomStore();
  const { filteredMessages } = messageStore();

  // const currentUserId = userStore((state) => state.user.id); <- 만들어야함
  const currentUserId = 1; // 유저 스토어에서 가져와야하는 정보

  return (
    <div className="mb-16 flex h-full w-full flex-col overflow-hidden rounded-lg bg-[#505050] md:mb-0">
      <ChatHeader title={title} subtitle={subtitle} />
      <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
        {filteredMessages.map((message) => (
          <ChatBubble
            key={`${message.roomid} - ${message.createdAt}`}
            sender={message.sender}
            message={message.message}
            timestamp={message.createdAt}
            isCurrentUser={message.userId === currentUserId}
          />
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatWindow;
