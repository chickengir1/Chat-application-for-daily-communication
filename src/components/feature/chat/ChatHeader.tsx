import { FaSearch, FaEllipsisV } from "react-icons/fa";

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  avatarUrl?: string;
}

const ChatHeader = ({ title, subtitle, avatarUrl }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between bg-[#404040] text-white px-4 py-3">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-500 rounded-full">{avatarUrl}</div>
        <div>
          <h2 className="text-sm font-bold">{title}</h2>
          <p className="text-xs text-gray-300">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-300 hover:text-white">
          <FaSearch size={18} />
        </button>
        <button className="text-gray-300 hover:text-white">
          <FaEllipsisV size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
