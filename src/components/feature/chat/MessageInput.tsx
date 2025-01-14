import useChat from "@/hooks/feature/chat/useChat";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";

const MessageInput = () => {
  const wsApiUrl = "ws://localhost:8080";

  const { value, onChange, onKeyDown, handleSendMessage } = useChat({
    wsUrl: wsApiUrl,
  });

  return (
    <div className="flex items-center bg-[#404040] p-3 rounded-lg">
      <label className="cursor-pointer text-gray-400 hover:text-white">
        <FaPaperclip size={20} />
        <input type="file" className="hidden" />
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Type a message..."
        className="flex-1 mx-3 px-3 py-2 bg-[#303030] text-white rounded-lg focus:outline-none"
      />
      <button className="mr-2 text-gray-400 hover:text-white">
        <FaSmile size={20} />
      </button>
      <button
        onClick={handleSendMessage}
        className="text-white p-2 rounded-lg hover:bg-gray-600 transition duration-200 ease-in-out"
      >
        <FaPaperPlane size={20} />
      </button>
    </div>
  );
};

export default MessageInput;
