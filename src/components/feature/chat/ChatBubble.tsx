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
  const bubbleStyle = isCurrentUser ? styles.bubbleMe : styles.bubbleOther;
  const alignStyle = isCurrentUser ? styles.alignEnd : styles.alignStart;
  const textAlign = isCurrentUser ? styles.textRight : styles.textLeft;

  const renderTimestamp = () =>
    timestamp && (
      <span className={`${styles.timestamp} ${textAlign}`}>{timestamp}</span>
    );

  return (
    <div className={`flex ${alignStyle} my-2`}>
      <div className={styles.container}>
        {!isCurrentUser && <span className={styles.sender}>{sender}</span>}
        <div className={`${styles.bubble} ${bubbleStyle}`}>{message}</div>
        {renderTimestamp()}
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
  textRight: "text-right",
  textLeft: "text-left",
  timestamp: "text-xs text-gray-400",
};
