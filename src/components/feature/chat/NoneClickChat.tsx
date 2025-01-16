import { FaPlusCircle } from "react-icons/fa";

const NoneClickChat = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <FaPlusCircle className={styles.icon} />
      </div>
      <h2 className={styles.heading}>채팅방을 선택해주세요</h2>
      <p className={styles.paragraph}>
        대화에 참여하려면 왼쪽 목록에서 채팅방을 선택하세요. 선택된 채팅방의
        메시지가 여기 표시됩니다.
      </p>
    </div>
  );
};

const styles = {
  container: "flex flex-col items-center justify-center h-full space-y-6",
  iconContainer: "bg-[#404040] text-[#888] p-4 rounded-full",
  icon: "w-16 h-16",
  heading: "text-2xl font-bold text-gray-600",
  paragraph: "text-gray-700 text-center max-w-md",
};

export default NoneClickChat;
