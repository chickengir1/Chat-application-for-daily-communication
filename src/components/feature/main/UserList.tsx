import { CgSmileSad } from "react-icons/cg";
import { FaUserCircle, FaUserPlus } from "react-icons/fa";
import type { User } from "@/hooks/api/useFriends";

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <>
      {users && users.length > 0 ? (
        users.map((user) => {
          return (
            <div className={styles.userItem} key={user.userId}>
              <FaUserCircle className={styles.userIcon} />
              <div className={styles.userInfo}>
                <div className={styles.userText}>
                  <h3 className={styles.username}>{user.nickname}</h3>
                  {/* <p className={styles.statusMessage}>{user.statusMessage}</p> */}
                </div>
              </div>
              <button
                type="button"
                onClick={() => console.log("친구추가")}
                className={styles.addButton}
              >
                <FaUserPlus />
              </button>
            </div>
          );
        })
      ) : (
        <div className={styles.noUserContainer}>
          <CgSmileSad className={styles.noUserIcon} />
          <p className={styles.noUserText}>검색된 사용자가 없습니다.</p>
        </div>
      )}
    </>
  );
};

export default UserList;

const styles = {
  userItem:
    "flex items-center mb-4 justify-between p-2 border-b border-gray-300 cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#606060] hover:shadow-md hover:rounded-lg",
  userIcon: "text-[#ccc] w-10 h-10 mr-3 flex-shrink-0",
  userInfo: "flex items-center space-x-3 flex-1 overflow-hidden",
  userText: "flex-1 min-w-0",
  username: "font-semibold truncate",
  statusMessage: "text-sm text-gray-300 truncate",
  addButton: "w-[20px] h-[20px] text-[#ccc] hover:text-[#48cd48]",
  noUserContainer:
    "flex flex-col items-center justify-center gap-[8px] w-full h-full",
  noUserIcon: "w-[60px] h-[60px]",
  noUserText: "text-center",
};
