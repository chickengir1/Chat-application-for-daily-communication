interface ContactListProps {
  title: string;
  contacts: {
    id: number;
    profileImg: string;
    name: string;
    isOnline: boolean;
  }[];
}

const ContactList = ({ title, contacts }: ContactListProps) => {
  const hover =
    "cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#606060] hover:shadow-md";

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <ul className="flex flex-wrap gap-x-[50px] gap-y-[28px]">
        {contacts.map((contact) => {
          console.log(contact);
          return (
            <li
              key={contact.id}
              className={`flex w-[100%] items-center gap-[12px] rounded-md border-b border-gray-300 px-4 py-2 sm:w-[calc(50%-25px)] ${hover}`}
            >
              <img
                src={contact.profileImg || "https://via.placeholder.com/40"}
                className="h-10 w-10 rounded-full bg-[#D9D9D9]"
              />
              <div>
                <p className="font-semibold">{contact.name}</p>
                <p className="text-[14px]">
                  {contact.isOnline ? "온라인" : "오프라인"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContactList;
