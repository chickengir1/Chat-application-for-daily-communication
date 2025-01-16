import { FaHome, FaComments, FaBell, FaCog } from "react-icons/fa";

export const icons = [
  { icon: <FaHome size={24} />, label: "Home", path: "/" },
  { icon: <FaComments size={24} />, label: "Chat", path: "/chat" },
  {
    icon: <FaBell size={24} />,
    label: "Notifications",
    path: "/notifications",
  },
  { icon: <FaCog size={24} />, label: "Settings", path: "/settings" },
];
