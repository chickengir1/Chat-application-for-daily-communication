import { navigationStore } from "@/stores/navigationStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();
  const { activeIndex, setActiveIndex } = navigationStore();

  const handleNavigation = (index: number, path: string) => {
    setActiveIndex(index);
    navigate(path);
  };

  return { activeIndex, handleNavigation };
};

export const useChatNaviation = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>("");

  const handleChatClick = (id: string) => {
    setSelectedChatId(id);
  };
  return { selectedChatId, handleChatClick };
};
