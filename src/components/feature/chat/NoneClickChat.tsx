import { FaPlusCircle } from "react-icons/fa";

const NoneClickChat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <div className="bg-[#404040] text-[#888] p-4 rounded-full">
        <FaPlusCircle className="w-16 h-16" />
      </div>
      <h2 className="text-2xl font-bold text-gray-600">
        채팅방을 선택해주세요
      </h2>
      <p className="text-gray-700 text-center max-w-md">
        대화에 참여하려면 왼쪽 목록에서 채팅방을 선택하세요. 선택된 채팅방의
        메시지가 여기 표시됩니다.
      </p>
    </div>
  );
};

export default NoneClickChat;
