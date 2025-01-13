interface ChatItemProps {
  name: string;
  message: string;
  time: string;
  avatar?: string;
  onClick?: () => void;
}

const ChatItem = ({ name, message, time, avatar, onClick }: ChatItemProps) => {
  const hover =
    "cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#606060] hover:shadow-md";

  return (
    <div
      className={`p-4 flex items-center justify-between py-2 border-b border-gray-300 space-y-4 mb-4 rounded-md ${hover}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <img
          src={avatar || "https://via.placeholder.com/40"}
          className="w-10 h-10 rounded-full bg-[#D9D9D9]"
        />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-400 truncate">{message}</p>
        </div>
      </div>
      <span className="text-sm text-gray-400">{time}</span>
    </div>
  );
};

export default ChatItem;
