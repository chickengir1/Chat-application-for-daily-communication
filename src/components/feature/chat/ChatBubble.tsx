const ChatBubble = ({
  sender,
  message,
  timestamp,
  isCurrentUser,
}: {
  sender: string;
  message: string;
  timestamp: string;
  isCurrentUser: boolean;
}): JSX.Element => {
  const bubbleClass = isCurrentUser
    ? "bg-[#E7E7E7] text-[#000000]"
    : "bg-[#3D3D3D] text-[#FFFFFF]";
  const alignment = isCurrentUser ? "justify-end" : "justify-start";
  const textColor = isCurrentUser ? "text-right" : "text-left";

  return (
    <div className={`flex ${alignment} my-2`}>
      <div className="max-w-[45%] flex flex-col space-y-1">
        {!isCurrentUser && (
          <span className="text-sm text-gray-50 font-bold">{sender}</span>
        )}
        <div
          className={`px-4 py-2 rounded-lg ${bubbleClass} shadow-md min-h-[40px] flex items-center break-all`}
        >
          {message}
        </div>
        {timestamp && (
          <span className={`text-xs ${textColor} text-gray-400`}>
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
