import { FaPlusCircle } from "react-icons/fa";

const UnselectedChat = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <FaPlusCircle className={styles.icon} />
      </div>
      <h2 className={styles.heading}>채팅방을 선택해주세요</h2>
      <p className={`${styles.paragraph} ${styles.hiddenOnMobile}`}>
        대화에 참여하려면 왼쪽 목록에서 채팅방을 선택하세요. 선택된 채팅방의
        메시지가 여기 표시됩니다.
      </p>
      <p className={`${styles.paragraph} ${styles.visibleOnMobile}`}>
        대화에 참여하려면 화면 상단의 채팅리스트 버튼에서 채팅방을 선택하세요.
      </p>
    </div>
  );
};

export default UnselectedChat;

const styles = {
  container: "flex h-full flex-col items-center justify-center space-y-6",
  iconWrapper: "rounded-full bg-[#404040] p-4 text-[#888]",
  icon: "h-16 w-16",
  heading: "text-2xl font-bold text-gray-600",
  paragraph: "max-w-md text-center text-gray-700",
  hiddenOnMobile: "hidden md:block",
  visibleOnMobile: "block md:hidden",
};
