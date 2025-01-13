import React, { useState } from "react";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";
import Input from "@/components/common/Input";

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  sendMessage: (text: string, file?: File | null) => void;
}

const MessageInput = ({
  value,
  onChange,
  onKeyDown,
  sendMessage,
}: MessageInputProps) => {
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachment(file);
      sendMessage("", file);
      setAttachment(null);
    }
  };

  const handleSendMessage = () => {
    if (!value.trim() && !attachment) return;
    sendMessage(value, attachment);
    setAttachment(null);
  };

  return (
    <div className="bg-[#404040] px-4 py-3 flex items-center space-x-3">
      <label className="text-gray-300 hover:text-white cursor-pointer">
        <FaPaperclip size={20} />
        <input
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <Input
        value={attachment ? attachment.name : value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Type a message..."
        className="flex-1 bg-[#505050] text-white placeholder-gray-400 px-3 py-2 rounded-lg border-none"
      />
      <button className="text-gray-300 hover:text-white">
        <FaSmile size={20} />
      </button>
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
      >
        <FaPaperPlane size={18} />
      </button>
    </div>
  );
};

export default MessageInput;
