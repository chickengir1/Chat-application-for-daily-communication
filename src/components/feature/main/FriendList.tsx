import { FaUserCircle, FaUserMinus } from "react-icons/fa";

interface FriendListProps {
  friends: {
    id: number;
    profileImg: string;
    username: string;
    statusMessage: string;
  }[];
}

const hover =
  "cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#606060] hover:shadow-md hover:rounded-lg";

const FriendList = ({ friends }: FriendListProps) => {
  return (
    <div>
      {friends.map((friend) => {
        return (
          <div
            className={`flex items-center mb-4 justify-between p-2 border-b border-gray-300 ${hover}`}
            key={friend.id}
          >
            <FaUserCircle className="text-[#ccc] w-10 h-10 mr-3 flex-shrink-0" />
            <div className="flex items-center space-x-3 flex-1 overflow-hidden">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{friend.username}</h3>
                <p className="text-sm text-gray-300 truncate">
                  {friend.statusMessage}
                </p>
              </div>
            </div>
            <button type="button" onClick={() => console.log("친구삭제")}>
              <FaUserMinus className="w-[20px] h-[20px] text-[#ef4949]" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FriendList;
