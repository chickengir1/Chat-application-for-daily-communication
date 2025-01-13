import useRenderMessage from "@/hooks/feature/useRenderMessage";
import { Message } from "@/utils/chatInterface";

const ChatBubble = ({
  sender,
  text,
  timestamp,
  position,
  type,
  content,
}: Message) => {
  const isRight = position === "right";
  const bubbleClass = isRight
    ? "bg-[#E7E7E7] text-[#000000]"
    : "bg-[#3D3D3D] text-[#FFFFFF]";
  const alignment = isRight ? "justify-end" : "justify-start";
  const textColor = isRight
    ? "text-right text-[#F9F9F9]"
    : "text-left text-[#F9F9F9]";

  const contentLoader = useRenderMessage(type, text, content);

  return (
    <div className={`flex ${alignment} my-2`}>
      <div className="max-w-[45%] flex flex-col space-y-1">
        {!isRight && (
          <span className="text-sm text-gray-50 font-bold">{sender}</span>
        )}
        <div
          className={`px-4 py-2 rounded-lg ${bubbleClass} shadow-md min-h-[40px] flex items-center break-all`}
        >
          {contentLoader}
        </div>
        {timestamp && (
          <span className={`text-xs ${textColor}`}>{timestamp}</span>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
