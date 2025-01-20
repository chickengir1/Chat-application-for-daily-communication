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

const hover =
  "cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#606060] hover:shadow-md hover:rounded-lg";

const FriendList = ({ friends }: FriendListProps) => {
  return (
    <>
      {friends && friends.length > 0 ? friends.map((friend) => {
        return (
          <div
            className={`flex items-center mb-4 justify-between p-2 border-b border-gray-300 ${hover}`}
            key={friend.id}
          >
            <FaUserCircle className="text-[#ccc] w-10 h-10 mr-3 flex-shrink-0" />
            <div className="flex items-center space-x-3 flex-1 overflow-hidden">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-[4px]">
                <span className={`block w-[6px] h-[6px] ${friend.isOnline ? 'bg-[#48cd48]' : 'bg-[#ff6161]'} rounded-full`}></span>
                <h3 className="font-semibold truncate">{friend.username}</h3>
                </div>
                <p className="text-sm text-gray-300 truncate">
                  {friend.statusMessage}
                </p>
              </div>
            </div>
            <button type="button" onClick={() => console.log("친구삭제")}>
              <FaUserMinus className="w-[20px] h-[20px] text-[#ccc] hover:text-[#ff6161]" />
            </button>
          </div>
        );
      }) : <div className="flex flex-col items-center justify-center gap-[8px] w-full h-full">
        <CgSmileSad className="w-[60px] h-[60px]" />
        <p className="text-center">추가된 친구가 없습니다.<br />친구를 추가해 주세요.</p>
        </div>}
    </>
  );
};

export default FriendList;
