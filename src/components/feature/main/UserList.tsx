import { CgSmileSad } from "react-icons/cg";
import { FaUserCircle, FaUserPlus } from "react-icons/fa";

interface UserListProps {
  users: {
    id: number;
    profileImg: string;
    username: string;
    statusMessage: string;
  }[];
}

const hover =
  "cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#606060] hover:shadow-md hover:rounded-lg";

const UserList = ({ users }: UserListProps) => {
  return (
    <>
      {users && users.length > 0 ? users.map((user) => {
        return (
          <div
            className={`flex items-center mb-4 justify-between p-2 border-b border-gray-300 ${hover}`}
            key={user.id}
          >
            <FaUserCircle className="text-[#ccc] w-10 h-10 mr-3 flex-shrink-0" />
            <div className="flex items-center space-x-3 flex-1 overflow-hidden">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{user.username}</h3>
                <p className="text-sm text-gray-300 truncate">
                  {user.statusMessage}
                </p>
              </div>
            </div>
            <button type="button" onClick={() => console.log("친구추가")}>
              <FaUserPlus className="w-[20px] h-[20px] text-[#ccc] hover:text-[#48cd48]" />
            </button>
          </div>
        );
      }) : <div className="flex flex-col items-center justify-center gap-[8px] w-full h-full">
          <CgSmileSad className="w-[60px] h-[60px]" />
          <p className="text-center">검색된 사용자가 없습니다.</p>
          </div>}
    </>
  );
};

export default UserList;
