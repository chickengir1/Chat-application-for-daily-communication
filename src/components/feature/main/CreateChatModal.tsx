import Button from "@/components/common/Button";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const friendListData = [
  {
    id: 1,
    username: "친구1",
  },
  {
    id: 2,
    username: "친구2",
  },
  {
    id: 3,
    username: "친구3",
  },
];

const CreateChatModal = ({ isOpen, onClose }: ChatModalProps) => {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("1:1");
  const [selectedFriend, SetSelectedFriend] = useState<string[]>([]); // 초기 상태를 배열로 설정
  const [error, setError] = useState("");

  // 채팅 종류 선택 시 selectedFriend 리셋
  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomType(e.target.value);
    SetSelectedFriend([]); // 채팅 종류 변경 시 친구 목록 초기화
  };

  // 친구 선택
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (roomType === "1:1") {
      SetSelectedFriend([value]); // 1:1 채팅일 때는 배열로 친구 하나만 선택
    } else {
      // 그룹 채팅일 때는 여러 명을 선택할 수 있음
      if (!value || selectedFriend.includes(value)) return;
      SetSelectedFriend((prev) => [...prev, value]);
    }
  };

  // 선택된 채팅할 친구 삭제
  const handleRemoveFriend = (friend: string) => {
    SetSelectedFriend((prev) => prev.filter((f) => f !== friend));
  };

  // 생성하기 버튼 클릭 시 처리
  const handleSubmit = () => {
    if (!roomName) {
      setError("채팅방 이름을 입력해주세요."); // 채팅방 이름이 비어 있으면 에러 메시지 설정
      return;
    }

    if (selectedFriend.length === 0) {
      setError("친구를 선택해주세요."); // 친구를 선택하지 않았으면 에러 메시지 설정
      return;
    }

    const chatData = {
      roomName,
      roomType,
      participants: selectedFriend,
    };
    console.log(chatData);

    // 에러 메시지 초기화
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className={modalWrapper}>
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
                    value="1:1"
                    checked={roomType === "1:1"}
                    onChange={handleRoomTypeChange}
                  />
                  <label htmlFor="roomType1">1:1 채팅</label>
                </span>
                <span className={radioItem}>
                  <input
                    type="radio"
                    id="roomType2"
                    name="roomType"
                    value="그룹"
                    checked={roomType === "그룹"}
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
  "absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 px-5";
const modalContainer = "w-full max-w-lg rounded-xl bg-white";
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
