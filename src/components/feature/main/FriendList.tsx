import { useRef } from "react";
import { CgSmileSad } from "react-icons/cg";
import { FaUserCircle, FaUserMinus } from "react-icons/fa";

interface FriendListProps {
  friends: {
    id: number;
    profileImg: string;
    username: string;
    statusMessage: string;
    isOnline: boolean;
  }[];
}

const FriendList = ({ friends }: FriendListProps) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const liRef = useRef<HTMLLIElement>(null);

  // useInfiniteScroll(
  //   {
  //     root: ulRef,
  //     element: liRef,
  //     onScroll: () => {
  //       console.log("온다!");
  //     },
  //   },
  //   [friends]
  // );

  return (
    <ul ref={ulRef} className={styles.listBody}>
      {friends && friends.length > 0 ? (
        friends.map((friend, i) => {
          const isLast = i === friends.length - 1;

          return (
            <li
              ref={isLast ? liRef : undefined}
              className={styles.container}
              key={friend.id}
            >
              <FaUserCircle className={styles.userIcon} />
              <div className={styles.userInfo}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-[4px]">
                    <span
                      className={styles.onlineStatus(friend.isOnline)}
                    ></span>
                    <h3 className={styles.userName}>{friend.username}</h3>
                  </div>
                  <p className={styles.statusMessage}>{friend.statusMessage}</p>
                </div>
              </div>
              <button type="button" onClick={() => console.log("친구삭제")}>
                <FaUserMinus className={styles.removeButton} />
              </button>
            </li>
          );
        })
      ) : (
        <li className={styles.noFriendsContainer}>
          <CgSmileSad className={styles.noFriendsIcon} />
          <p className={styles.noFriendsText}>
            추가된 친구가 없습니다.
            <br />
            친구를 추가해 주세요.
          </p>
        </li>
      )}
    </ul>
  );
};

export default FriendList;

const styles = {
  container:
    "flex items-center mb-4 justify-between p-2 border-b border-gray-300 cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#606060] hover:shadow-md hover:rounded-lg",
  userIcon: "text-[#ccc] w-10 h-10 mr-3 flex-shrink-0",
  userInfo: "flex items-center space-x-3 flex-1 overflow-hidden",
  userName: "font-semibold truncate",
  statusMessage: "text-sm text-gray-300 truncate",
  onlineStatus: (isOnline: boolean) =>
    `block w-[6px] h-[6px] ${isOnline ? "bg-[#48cd48]" : "bg-[#ff6161]"} rounded-full`,
  removeButton: "w-[20px] h-[20px] text-[#ccc] hover:text-[#ff6161]",
  noFriendsContainer:
    "flex flex-col items-center justify-center gap-[8px] w-full h-full",
  noFriendsIcon: "w-[60px] h-[60px]",
  noFriendsText: "text-center",
  listBody: "h-[calc(100%-64px)] overflow-auto p-4",
};
