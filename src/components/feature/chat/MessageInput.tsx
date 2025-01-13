import React from "react";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";
import Input from "@/components/common/Input";

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const MessageInput = ({
  value,
  onChange,
  onKeyDown,
  onSend,
}: MessageInputProps) => {
  return (
    <div className="bg-[#404040] px-4 py-3 flex items-center space-x-3">
      <button className="text-gray-300 hover:text-white">
        <FaPaperclip size={20} />
      </button>

      <Input
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="메세지를 입력하세요..."
        className="flex-1 bg-[#505050] text-white placeholder-gray-400 px-3 py-2 rounded-lg border-none outline-none"
      />
      <button className="text-gray-300 hover:text-white">
        <FaSmile size={20} />
      </button>
      <button
        onClick={onSend}
        className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
      >
        <FaPaperPlane size={18} />
      </button>
    </div>
  );
};

export default MessageInput;
