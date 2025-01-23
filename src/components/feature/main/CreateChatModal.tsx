import Button from "@/components/common/Button";
import { useChatParticipants } from "@/hooks/feature/chat/useChatParticipants";
import { useCreateChatRoom } from "@/hooks/feature/chat/useCreateChatRoom";
import { friendListData } from "@/utils/stub";
import { IoClose } from "react-icons/io5";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateChatModal = ({ isOpen, onClose }: ChatModalProps) => {
  const {
    roomName,
    setRoomName,
    roomType,
    selectedFriend,
    handleRoomTypeChange,
    handleRemoveFriend,
    handleSelectChange,
  } = useChatParticipants();
  const { error, handleCreateChatRoom } = useCreateChatRoom();

  const handleSubmit = async () => {
    const result = await handleCreateChatRoom(
      roomName,
      roomType,
      selectedFriend
    );

    if (result) {
      console.log("채팅방 생성 성공!", result);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={modalWrapper}>
      <div className={modalDim} onClick={onClose}></div>
      <div className={modalContainer}>
        <h3 className={header}>채팅방 생성</h3>
        <div className={formContainer}>
          <ul className={list}>
            {/* 채팅방 이름 */}
            <li>
              <p className={label}>채팅방 이름</p>
              <input
                type="text"
                className={input}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </li>

            {/* 채팅 종류 */}
            <li>
              <p className={label}>채팅 종류</p>
              <div className={radioGroup}>
                <span className={radioItem}>
                  <input
                    type="radio"
                    id="roomType1"
                    name="roomType"
                    value="DM"
                    checked={roomType === "DM"}
                    onChange={handleRoomTypeChange}
                  />
                  <label htmlFor="roomType1">1:1 채팅</label>
                </span>
                <span className={radioItem}>
                  <input
                    type="radio"
                    id="roomType2"
                    name="roomType"
                    value="GM"
                    checked={roomType === "GM"}
                    onChange={handleRoomTypeChange}
                  />
                  <label htmlFor="roomType2">그룹 채팅</label>
                </span>
              </div>
            </li>

            {/* 채팅할 친구 */}
            <li>
              <p className={label}>채팅할 친구</p>
              <select
                className={input}
                onChange={handleSelectChange}
                value={selectedFriend.length === 0 ? "" : selectedFriend[0]}
              >
                <option value="" disabled>
                  친구를 선택하세요.
                </option>
                {friendListData.map((friend) => {
                  return <option key={friend.id}>{friend.username}</option>;
                })}
              </select>
              <ul className={selectedFriends}>
                {selectedFriend.map((friend) => (
                  <li key={friend} className={selectedFriendItem}>
                    {friend}
                    <button onClick={() => handleRemoveFriend(friend)}>
                      <IoClose />
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          {/* 에러 메시지 출력 */}
          {error && <p className={errorText}>{error}</p>}
        </div>
        <div className={buttonContainer}>
          <Button text="생성하기" onClick={handleSubmit} />
          <Button text="닫기" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

// 테일윈드 스타일을 JavaScript 객체로 추출
const modalWrapper =
  "absolute left-0 top-0 flex h-full w-full items-center justify-center px-5";
const modalDim = "absolute left-0 top-0 h-full w-full bg-black bg-opacity-50";
const modalContainer = "relative w-full max-w-lg rounded-xl bg-white z-1";
const header = "flex items-center px-6 h-[64px] text-lg font-bold leading-16";
const formContainer = "flex-1 border-b border-t p-6";
const list = "flex flex-col gap-8";
const label = "mb-1 font-semibold";
const input = "h-10 w-full rounded-lg border border-gray-300 px-3";
const radioGroup = "flex gap-7";
const radioItem = "flex items-center gap-2";
const selectedFriends = "mt-2 flex gap-1";
const selectedFriendItem =
  "flex items-center gap-2 rounded-full bg-gray-600 px-3 text-sm leading-7 text-white";
const errorText = "mt-1 text-xs text-red-500";
const buttonContainer = "flex h-16 items-center justify-center gap-2 px-6";

export default CreateChatModal;
