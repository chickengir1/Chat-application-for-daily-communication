import Button from "@/components/common/Button";
import ChatList from "@/components/feature/chat/ChatList";
import CreateChatModal from "@/components/feature/main/CreateChatModal";
import FriendList from "@/components/feature/main/FriendList";
import User from "@/components/feature/main/user/User";
import { useRoomList } from "@/hooks/api/useRoomList";
import useChatRooms from "@/hooks/feature/chat/RoomLists/useChatRooms";
import { friendListData } from "@/utils/stub";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const HomePage = () => {
  const [friendList, setFriendList] = useState(false);
  const [createChatModal, setCreateChatModal] = useState(false);

  const { rooms } = useRoomList(); // 나중에 ,isLoading, error,refetch 추가 해서 써주세요
  const { filteredRooms } = useChatRooms(rooms);

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          {/* 친구 목록 */}
          <div
            className={`${styles.listContainer} ${friendList ? "h-[30vh]" : "h-[64px]"}`}
          >
            <div className={styles.listHeader}>
              <h2 className={styles.listTitle}>친구 목록</h2>
              <div className={styles.headerButtons}>
                <Button
                  text="채팅하기"
                  onClick={() => {
                    setCreateChatModal(true);
                  }}
                />
                <button
                  className="sm:hidden"
                  onClick={() => {
                    setFriendList(!friendList);
                  }}
                >
                  {friendList ? <FaAngleUp /> : <FaAngleDown />}
                </button>
              </div>
            </div>
            <FriendList friends={friendListData} />
          </div>

          <User />
        </div>

        {/* 최근 대화 */}
        <div className={styles.chatContainer}>
          <h2 className={styles.chatHeader}>최근 대화</h2>
          <div className={styles.chatBody}>
            <ChatList chats={filteredRooms} />
          </div>
        </div>
      </div>
      {createChatModal && (
        <CreateChatModal
          isOpen={createChatModal}
          onClose={() => setCreateChatModal(false)}
        />
      )}
    </>
  );
};

export default HomePage;

const styles = {
  pageContainer:
    "flex h-[calc(100%-72px)] flex-col gap-[20px] p-2 text-white md:h-[100%] md:py-6 md:pl-0 md:pr-6",
  contentWrapper: "flex flex-col gap-[20px] sm:flex-row",
  listContainer:
    "sm:w-[50%] overflow-hidden rounded-lg bg-[#505050] transition-all duration-300 ease-in-out sm:h-[50vh]",
  listHeader:
    "flex gap-[8px] h-[64px] items-center justify-between bg-[#404040] px-4",
  listTitle: "font-bold sm:text-[18px] whitespace-nowrap",
  headerButtons: "flex gap-[16px]",
  searchInputWrapper: "relative",
  searchInput: "h-[40px] w-full rounded-lg bg-[#505050] px-2",
  chatContainer: "h-[100%] overflow-hidden rounded-lg bg-[#505050]",
  chatHeader:
    "flex h-[64px] items-center justify-between bg-[#404040] px-4 font-bold sm:text-[18px]",
  chatBody: "h-[calc(100%-64px)] overflow-auto",
};
