import ChatItem from "./ChatItem";

interface GroupChatProps {
  chats: {
    id: number;
    name: string;
    message: string;
    time: string;
    avatar?: string;
  }[];
}

const GroupChat = ({ chats }: GroupChatProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Groups</h2>
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          name={chat.name}
          message={chat.message}
          time={chat.time}
          avatar={chat.avatar}
        />
      ))}
    </div>
  );
};

export default GroupChat;
