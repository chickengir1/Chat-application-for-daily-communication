import { useState } from "react";
import {
  FaHome,
  FaComments,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const icons = [
    { icon: <FaHome size={24} />, label: "Home" },
    { icon: <FaComments size={24} />, label: "Comments" },
    { icon: <FaBell size={24} />, label: "Notifications" },
    { icon: <FaCog size={24} />, label: "Settings" },
  ];
  const activeIcon = "w-full border-r-8 bg-[#3D3D3D] border-[#777777]";
  const activeIconText = "font-bold text-gray-200";

  return (
    <div
      className="w-[15%] bg-[#505050] rounded-lg text-white flex flex-col justify-between py-4"
      style={{
        height: "calc(100vh - 4rem)",
      }}
    >
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <div className="bg-[#D9D9D9] rounded-full mt-4 w-16 h-16"></div>
        </div>
        {icons.map((item, index) => {
          const isActive = activeIndex === index;
          const buttonClass = isActive ? activeIcon : "bg-transparent";
          const textClass = isActive ? activeIconText : "text-gray-400";

          return (
            <button
              key={item.label}
              onClick={() => setActiveIndex(index)}
              className={`p-3 flex flex-col items-center mb-4 ${buttonClass}`}
            >
              {item.icon}
              <span className={`text-xs mt-1 ${textClass}`}>{item.label}</span>
            </button>
          );
        })}
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
