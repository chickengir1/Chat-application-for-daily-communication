import GroupChat from "@/components/feature/chat/GroupChat";
import PersonalChat from "@/components/feature/chat/PersonalChat";
import Input from "@/components/common/Input";
import useInput from "@/hooks/common/useInput";

const ChatPage = () => {
  const { value: search, onChange: setSearch } = useInput("");

  const groupChats = [
    {
      id: 1,
      name: "Group Chat 1",
      message: "Message 1",
      time: "5:25 PM",
      avatar: "",
    },
    {
      id: 2,
      name: "Group Chat 2",
      message: "Message 2",
      time: "6:00 PM",
      avatar: "",
    },
    {
      id: 3,
      name: "Group Chat 3",
      message: "Message 3",
      time: "3:45 PM",
      avatar: "",
    },
    {
      id: 4,
      name: "Group Chat 4",
      message: "Message 4",
      time: "7:45 PM",
      avatar: "",
    },
    {
      id: 5,
      name: "Group Chat 5",
      message: "Message 5",
      time: "9:05 PM",
      avatar: "",
    },
  ];

  const personalChats = [
    {
      id: 1,
      name: "Alice",
      message: "Hey, how are you?",
      time: "4:15 PM",
      avatar: "",
    },
    {
      id: 2,
      name: "Bob",
      message: "Can we meet tomorrow?",
      time: "5:30 PM",
      avatar: "",
    },
    {
      id: 3,
      name: "Charlie",
      message: "Don't forget about the meeting.",
      time: "2:00 PM",
      avatar: "",
    },
    {
      id: 4,
      name: "David",
      message: "Here's the document you asked for.",
      time: "1:20 PM",
      avatar: "",
    },
  ];

  const sectionStyle =
    "bg-[#505050] text-white rounded-lg p-4 scrollbar-none transition-colors";

  const inputStyle =
    "bg-[#505050] text-white placeholder-gray-400 border-none p-3 rounded-lg w-full h-full";

  const sectionHeight = {
    search: "h-[8%]",
    groupChat: "h-[40%]",
    personalChat: "h-[50%]",
  };

  return (
    <div className="flex flex-col h-screen p-6 space-y-4">
      <div className={sectionHeight.search}>
        <Input
          value={search}
          onChange={setSearch}
          placeholder="Search"
          className={inputStyle}
        />
      </div>
      <div
        className={`${sectionStyle} ${sectionHeight.groupChat} overflow-y-auto`}
      >
        <GroupChat chats={groupChats} />
      </div>
      <div
        className={`${sectionStyle} ${sectionHeight.personalChat} overflow-y-auto`}
      >
        <PersonalChat chats={personalChats} />
      </div>
    </div>
  );
};

export default ChatPage;
