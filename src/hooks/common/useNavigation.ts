import { useNavigationStore } from "@/stores/navigationStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();
  const { activeIndex, setActiveIndex } = useNavigationStore();

  const handleNavigation = (index: number, path: string) => {
    setActiveIndex(index);
    navigate(path);
  };

  return { activeIndex, handleNavigation };
};

export const useChatNaviation = () => {
  const [selectedChatId, setSelectedChatId] = useState<number>(0);

  const handleChatClick = (id: number) => {
    setSelectedChatId(id);
  };
  return { selectedChatId, handleChatClick };
};
