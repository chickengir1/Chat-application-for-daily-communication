import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaComments,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

// 네비 상태 저장 시켜야함

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

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

  const navigation = icons.map((item, index) => {
    const activeIcon = "w-full border-r-8 bg-[#3D3D3D] border-[#777777]";
    const activeIconText = "font-bold text-gray-200";

    const isActive = activeIndex === index;
    const buttonClass = isActive ? activeIcon : "bg-transparent";
    const textClass = isActive ? activeIconText : "text-gray-400";

    return (
      <button
        key={item.label}
        onClick={() => {
          setActiveIndex(index);
          navigate(item.path);
        }}
        className={`p-3 flex flex-col items-center mb-4 ${buttonClass}`}
      >
        {item.icon}
        <span className={`text-xs mt-1 ${textClass}`}>{item.label}</span>
      </button>
    );
  });

  return (
    <div className="h-full bg-[#505050] rounded-lg text-white flex flex-col justify-between py-4">
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <div className="bg-[#D9D9D9] rounded-full mt-4 w-16 h-16"></div>
        </div>
        {navigation}
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
