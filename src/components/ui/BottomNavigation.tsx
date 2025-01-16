import { useNavigation } from "@/hooks/common/useNavigation";
import { icons } from "@/utils/iconField";
import { renderIcons } from "@/utils/navigationUtils";

const BottomNavigation = () => {
  const { activeIndex, handleNavigation } = useNavigation();

  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-around bg-[#505050] text-white">
      {renderIcons(icons, "horizontal", activeIndex, handleNavigation)}
    </div>
  );
};

export default BottomNavigation;
