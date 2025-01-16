import { useNavigation } from "@/hooks/common/useNavigation";
import { FaHome, FaComments, FaBell, FaCog } from "react-icons/fa";

const icons = [
  { icon: <FaHome size={24} />, label: "Home", path: "/" },
  { icon: <FaComments size={24} />, label: "Chat", path: "/chat" },
  {
    icon: <FaBell size={24} />,
    label: "Notifications",
    path: "/notifications",
  },
  { icon: <FaCog size={24} />, label: "Settings", path: "/settings" },
];

const BottomNavigation = () => {
  const { activeIndex, handleNavigation } = useNavigation();

  const onNavigation =
    (index: number, path: string) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      handleNavigation(index, path);
    };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#505050] text-white flex justify-around py-3">
      {icons.map((item, index) => (
        <button
          key={item.label}
          onClick={onNavigation(index, item.path)}
          className={`flex flex-col items-center ${
            activeIndex === index ? "text-gray-200 font-bold" : "text-gray-400"
          } hover:text-gray-200`}
        >
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
