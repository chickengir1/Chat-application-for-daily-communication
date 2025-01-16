import ChatList from "@/components/feature/chat/ChatList";
import ContactList from "@/components/feature/contact/ContactList";
import { contactData, chatListData } from "@/utils/stub";

const HomePage = () => {
  return (
    <div className="flex h-[100%] flex-col gap-[16px] py-6 pr-6 text-[#fff]">
      <div className="h-[50%] w-[100%] overflow-auto rounded-[8px] bg-[#505050] p-[28px]">
        <h1>최근대화</h1>
        <ChatList chats={chatListData} />
      </div>
      <div className="h-[50%] w-[100%] overflow-auto rounded-[8px] bg-[#505050] p-[28px]">
        <ContactList title="즐겨찾는 연락처" contacts={contactData} />
      </div>
    </div>
  );
};

export default HomePage;
