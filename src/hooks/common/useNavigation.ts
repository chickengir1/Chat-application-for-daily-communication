import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = (index: number, path: string) => {
    setActiveIndex(index);
    navigate(path);
  };

  return { activeIndex, handleNavigation };
};

export default useNavigation;
