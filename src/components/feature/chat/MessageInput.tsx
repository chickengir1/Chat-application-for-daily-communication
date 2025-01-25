import Input from "@/components/common/Input";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";
import useSendMessage from "@/hooks/feature/chat/useSendMessage";

const MessageInput = ({ roomId }: { roomId: string }) => {
  const { value, onChange, onKeyDown, handleSendMessage } = useSendMessage({
    roomId,
  });

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <FaPaperclip size={20} />
        <Input type="file" onChange={onChange} className={styles.hiddenInput} />
      </label>
      <button className={styles.iconButton}>
        <FaSmile size={20} />
      </button>
      <Input
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Type a message..."
        className={styles.textInput}
        maxLength={100}
      />
      <button onClick={handleSendMessage} className={styles.sendButton}>
        <FaPaperPlane size={20} />
      </button>
    </div>
  );
};

export default MessageInput;

const styles = {
  container: "flex items-center rounded-lg bg-[#404040] p-3",
  label: "cursor-pointer text-gray-400 hover:text-white",
  hiddenInput: "hidden",
  textInput:
    "mx-3 flex-1 rounded-lg bg-[#303030] px-3 py-2 text-white focus:outline-none",
  iconButton: "ml-4 text-gray-400 hover:text-white",
  sendButton:
    "rounded-lg p-2 text-white transition duration-200 ease-in-out hover:bg-gray-600",
};
