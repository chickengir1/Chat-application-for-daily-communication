import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import ChatBubble from "./ChatBubble";
import { messageStore } from "@/stores/messageStore";
import { roomStore } from "@/stores/roomStore";

const ChatWindow = () => {
  const { title, subtitle } = roomStore();
  const { filteredMessages } = messageStore();

  return (
    <div className="w-full h-full bg-[#505050] rounded-lg flex flex-col overflow-hidden mb-16 md:mb-0">
      <ChatHeader title={title} subtitle={subtitle} />
      <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
        {filteredMessages.map((message) => (
          <ChatBubble
            key={message.roomid}
            sender={message.sender}
            message={message.message}
            timestamp={message.createdAt}
            isCurrentUser={message.userId === 1}
          />
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatWindow;
