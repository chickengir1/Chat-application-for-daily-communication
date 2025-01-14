import ChatList from "@/components/feature/chat/ChatList";
import ContactList from "@/components/feature/contact/ContactList";
import { contactData, recentChats } from "@/utils/stub";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-[16px] h-[100%] py-6 pr-6 text-[#fff]">
      <div className="w-[100%] h-[50%] p-[28px] bg-[#505050] rounded-[8px] overflow-auto">
        <h1>최근대화</h1>
        <ChatList chats={recentChats} />
      </div>
      <div className="w-[100%] h-[50%] p-[28px] bg-[#505050] rounded-[8px] overflow-auto">
        <ContactList title="즐겨찾는 연락처" contacts={contactData} />
      </div>
    </div>
  );
};

export default HomePage;
