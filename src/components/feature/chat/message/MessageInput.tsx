/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, Suspense } from "react";
import Input from "@/components/common/Input";
import { useFileUpload } from "@/hooks/feature/chat/message/useFileUpload";
import useMessageInput from "@/hooks/feature/chat/message/useMessageInput";
import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";
const EmojiPicker = React.lazy(() => import("emoji-picker-react"));

const MessageInput = ({ roomId }: { roomId: string }) => {
  const { value, onChange, onKeyDown, handleSendMessage, setValue } =
    useMessageInput(roomId);
  const { handleFileChange, isUploading } = useFileUpload(roomId, setValue);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject: any) => {
    setValue(value + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className={styles.container}>
      <label
        className={`${styles.label} ${isUploading ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <FaPaperclip size={20} />
        <Input
          type="file"
          onChange={handleFileChange}
          className={styles.hiddenInput}
          accept="image/*,.pdf,.doc,.docx,.txt"
          disabled={isUploading}
        />
      </label>
      <button
        className={styles.iconButton}
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        disabled={isUploading}
      >
        <FaSmile size={20} />
      </button>
      {showEmojiPicker && (
        <Suspense fallback={<div>이모지 불러오는 중...</div>}>
          <div className="absolute bottom-16 left-4">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        </Suspense>
      )}
      <Input
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={
          isUploading ? "파일 업로드 중..." : "메시지를 입력하세요..."
        }
        className={styles.textInput}
        maxLength={100}
        disabled={isUploading}
      />
      <button
        onClick={handleSendMessage}
        className={styles.sendButton}
        disabled={isUploading}
      >
        <FaPaperPlane size={20} />
      </button>
    </div>
  );
};

export default MessageInput;

const styles = {
  container: "flex items-center rounded-lg bg-[#404040] p-3 relative",
  label: "cursor-pointer text-gray-400 hover:text-white",
  hiddenInput: "hidden",
  textInput:
    "mx-3 flex-1 rounded-lg bg-[#303030] px-3 py-2 text-white focus:outline-none disabled:opacity-50",
  iconButton: "text-gray-400 hover:text-white ml-2",
  sendButton:
    "rounded-lg p-2 text-white transition duration-200 ease-in-out hover:bg-gray-600 disabled:opacity-50",
};
