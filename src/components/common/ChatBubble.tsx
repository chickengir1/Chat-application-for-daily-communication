import React from "react";

interface ChatBubbleProps {
  sender: string;
  text: string;
  timestamp: string;
  position: "left" | "right";
  children?: React.ReactNode;
}

const ChatBubble = ({
  sender,
  text,
  timestamp,
  position,
  children,
}: ChatBubbleProps) => {
  const isRight = position === "right";
  const bubbleClass = isRight
    ? "bg-[#E7E7E7] text-[#000000]"
    : "bg-[#3D3D3D] text-[#FFFFFF]";
  const alignment = isRight ? "justify-end" : "justify-start";

  return (
    <div className={`flex ${alignment} my-2`}>
      <div className="max-w-[45%] flex flex-col space-y-1">
        {!isRight && (
          <span className="text-sm text-gray-50 font-bold">{sender}</span>
        )}
        <div
          className={`px-4 py-2 rounded-lg ${bubbleClass} shadow-md min-h-[40px] flex items-center`}
        >
          {text && <p>{text}</p>}
          {children}
        </div>
        {timestamp && (
          <span
            className={`text-xs ${
              isRight ? "text-right text-[#F9F9F9]" : "text-left text-[#F9F9F9]"
            }`}
          >
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
