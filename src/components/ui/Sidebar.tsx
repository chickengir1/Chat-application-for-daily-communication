import {
  FaHome,
  FaComments,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import useNavigation from "@/hooks/common/useNavigation";

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

const Sidebar = () => {
  const { activeIndex, handleNavigation } = useNavigation();

  const renderIcons = (direction: "vertical" | "horizontal") =>
    icons.map((item, index) => {
      const isActive = activeIndex === index;
      const buttonClass = isActive
        ? "bg-[#3D3D3D] text-gray-200 border-gray-500 border-r-4 font-bold w-full"
        : "bg-transparent text-gray-300";
      const wrapperClass =
        direction === "vertical"
          ? "flex flex-col items-center mb-4"
          : "flex flex-col items-center w-full";

      return (
        <button
          key={item.label}
          onClick={() => handleNavigation(index, item.path)}
          className={`p-3 ${wrapperClass} ${buttonClass}`}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      );
    });

  return (
    <div className="hidden md:flex bg-[#505050] rounded-lg h-full text-white flex-col">
      <div className="flex flex-col items-center flex-grow">
        <div className="flex flex-col items-center w-full">
          <div className="mb-6">
            <div className="bg-[#D9D9D9] rounded-full mt-4 w-16 h-16"></div>
          </div>
          {renderIcons("vertical")}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button className="p-3 rounded flex flex-col items-center bg-transparent hover:bg-[#3D3D3D] w-full">
          <FaSignOutAlt size={24} />
          <span className="text-xs mt-1 text-gray-400">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
