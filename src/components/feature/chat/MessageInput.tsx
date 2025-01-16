import useChat from "@/hooks/feature/chat/useSendMessage";
import Input from "@/components/common/Input";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";

const wsApiUrl = "ws://localhost:8080"; // 웹소켓 api 주소

const MessageInput = () => {
  const { value, onChange, onKeyDown, handleSendMessage } = useChat({
    wsUrl: wsApiUrl,
  });

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <FaPaperclip size={20} />
        <Input type="file" className={styles.hiddenInput} />
      </label>
      <Input
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Type a message..."
        className={styles.textInput}
      />
      <button className={styles.iconButton}>
        <FaSmile size={20} />
      </button>
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
  iconButton: "mr-2 text-gray-400 hover:text-white",
  sendButton:
    "rounded-lg p-2 text-white transition duration-200 ease-in-out hover:bg-gray-600",
};
