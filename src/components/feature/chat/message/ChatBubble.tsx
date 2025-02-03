import { formatTime } from "@/hooks/feature/chat/RoomLists/useChatHandlers";
import { useState, useEffect } from "react";

interface ChatBubbleProps {
  sender?: string;
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
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const chatAlign = isCurrentUser ? styles.alignEnd : styles.alignStart;
  const alignStyle = sender ? chatAlign : styles.alignCenter;
  const bubbleStyle = isCurrentUser ? styles.bubbleMe : styles.bubbleOther;
  const textAlignment = isCurrentUser ? styles.textRight : styles.textLeft;
  const isAwsUrl = message.includes("sookyung");

  useEffect(() => {
    if (isAwsUrl && isImageLoading && retryCount < 3) {
      const timer = setTimeout(() => {
        setRetryCount((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAwsUrl, isImageLoading, retryCount]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
    setRetryCount(0);
  };

  const handleImageError = () => {
    if (retryCount < 3) {
      setIsImageLoading(true);
    } else {
      setIsImageLoading(false);
    }
  };

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
        <div className={`${styles.bubble} ${bubbleStyle}`}>
          {isAwsUrl ? (
            <div className={imageStyles.wrapper}>
              {isImageLoading && (
                <div className={imageStyles.loadingContainer}>
                  <div className={imageStyles.spinner} />
                </div>
              )}
              <img
                key={`${message}-${retryCount}`}
                src={message}
                alt="이미지 로딩 중..."
                className={`${imageStyles.image} ${
                  isImageLoading ? imageStyles.hidden : imageStyles.visible
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          ) : (
            message
          )}
        </div>
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

const imageStyles = {
  wrapper: "relative",
  loadingContainer:
    "absolute inset-0 flex items-center justify-center rounded-lg bg-gray-800",
  spinner:
    "h-6 w-6 animate-spin rounded-full border-2 border-gray-50 border-t-transparent",
  image: "max-w-full rounded-lg py-2 transition-opacity duration-200",
  hidden: "opacity-0",
  visible: "opacity-100",
};
