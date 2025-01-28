import { formatTime } from "@/hooks/feature/chat/RoomLists/useChatHandlers";

interface ChatBubbleProps {
  sender?: string | null;
  message: string;
  timestamp?: string;
  isCurrentUser: boolean;
}

const ChatBubble = ({
  sender,
  message,
  timestamp,
  isCurrentUser,
}: ChatBubbleProps) => {
  const chatAlign = isCurrentUser ? styles.alignEnd : styles.alignStart;
  const alignStyle = sender ? chatAlign : styles.alignCenter;
  const bubbleStyle = isCurrentUser ? styles.bubbleMe : styles.bubbleOther;
  const textAlignment = isCurrentUser ? styles.textRight : styles.textLeft;

  if (!sender) {
    return (
      <div className={senderStyle.alert}>
        <div className={senderStyle.borderLien}>{message}</div>
      </div>
    );
  }

  return (
    <div className={`flex ${alignStyle} my-2`}>
      <div className={styles.container}>
        <span className={`${styles.sender} ${textAlignment}`}>{sender}</span>
        <div className={`${styles.bubble} ${bubbleStyle}`}>{message}</div>
        <span className={`${styles.timestamp} ${textAlignment}`}>
          {timestamp ? formatTime(timestamp) : ""}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;

const styles = {
  container: "max-w-[45%] flex flex-col space-y-1",
  sender: "text-sm text-gray-50 font-bold",
  bubble:
    "px-4 py-2 rounded-lg shadow-md min-h-[40px] flex items-center break-all",
  bubbleMe: "bg-[#E7E7E7] text-[#000000]",
  bubbleOther: "bg-[#3D3D3D] text-[#FFFFFF]",
  alignEnd: "justify-end",
  alignStart: "justify-start",
  alignCenter: "justify-center",
  textRight: "text-right",
  textLeft: "text-left",
  timestamp: "text-xs text-gray-50",
};

const senderStyle = {
  alert: "my-2 flex justify-center",
  borderLien: "rounded border px-4 py-2 text-sm text-gray-50 shadow-sm",
};
