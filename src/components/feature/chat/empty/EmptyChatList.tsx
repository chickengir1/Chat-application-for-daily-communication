import { FaUserCircle } from "react-icons/fa";
import { useNavigation } from "@/hooks/common/useNavigation";
import Button from "@/components/common/Button";

const EmptyChatList = () => {
  const { activeIndex, handleNavigation } = useNavigation();

  const navigateToFriends = () => {
    handleNavigation(activeIndex - 1, "/");
  };

  const isEmpty = activeIndex === 0;

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        {!isEmpty && <FaUserCircle className={styles.icon} />}
      </div>
      <p className={`${styles.mainText} ${isEmpty ? styles.largeText : ""}`}>
        채팅방이 비어있습니다.
      </p>
      <p className={`${styles.subText} ${isEmpty ? styles.largeText : ""}`}>
        친구를 초대해 채팅을 시작해보세요!
      </p>
      {!isEmpty && (
        <Button
          text="친구 목록으로 이동"
          onClick={navigateToFriends}
          className={styles.button}
        />
      )}
    </div>
  );
};

export default EmptyChatList;

const styles = {
  container:
    "m-8 flex flex-col items-center justify-center space-y-4 text-center text-white",
  iconContainer: "flex flex-col items-center space-y-2",
  icon: "h-16 w-16 text-[#ccc]",
  mainText: "text-lg font-medium",
  subText: "text-sm",
  largeText: "text-xl font-bold text-center",
  button:
    "rounded-lg bg-[#303030] px-4 py-2 text-white shadow-md transition-all duration-300 hover:bg-[#808080]",
};
