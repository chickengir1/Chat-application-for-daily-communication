import ChatItem from "./ChatItem";

interface PersonalChatProps {
  chats: {
    id: number;
    name: string;
    message: string;
    time: string;
    avatar?: string;
  }[];
}

const PersonalChat = ({ chats }: PersonalChatProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">People</h2>
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

export default PersonalChat;
