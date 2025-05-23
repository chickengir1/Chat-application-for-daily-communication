import { useAuth } from "@/hooks/api/useAuth";
import { useNavigation } from "@/hooks/common/useNavigation";
import { icons } from "@/utils/Constans";
import { renderIcons } from "@/utils/navigationUtils";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

//**사이드바 컴포넌트 */
const Sidebar = () => {
  const navigate = useNavigation();
  const { activeIndex, handleNavigation } = navigate;
  const userProfileImage: string | null = "";
  const { isSignedIn, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    handleNavigation(0, "/login");
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.userProfileWrapper}>
          <div className={styles.userProfileContainer}>
            {userProfileImage ? (
              <img
                src={userProfileImage}
                alt="User Profile"
                className={styles.userProfileImage}
              />
            ) : (
              <div className={styles.userProfilePlaceholder}>
                <FaUserCircle className={styles.userProfileIcon} />
              </div>
            )}
          </div>
          {renderIcons(icons, "vertical", activeIndex, handleNavigation)}
        </div>
      </div>
      {isSignedIn && (
        <div className={styles.logoutWrapper}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <FaSignOutAlt size={24} />
            <span className={styles.logoutLabel}>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

const styles = {
  sidebar: "hidden h-full flex-col rounded-lg bg-[#505050] text-white md:flex",
  content: "flex flex-grow flex-col items-center w-[100px]",
  userProfileWrapper: "flex w-full flex-col items-center",
  userProfileContainer: "mb-6",
  userProfileImage: "mt-4 h-16 w-16 rounded-full object-cover",
  userProfilePlaceholder:
    "mt-4 flex h-16 w-16 items-center justify-center rounded-full",
  userProfileIcon: "h-16 w-16 text-[#ccc]",
  baseButton: "p-3",
  activeButton:
    "bg-[#3D3D3D] text-gray-200 border-gray-500 border-b-4 font-bold w-full",
  inactiveButton: "bg-transparent text-gray-300",
  verticalWrapper: "flex flex-col items-center mb-4",
  horizontalWrapper: "flex flex-col items-center w-full",
  iconLabel: "mt-1 text-xs",
  logoutWrapper: "flex flex-col items-center",
  logoutButton:
    "flex w-full flex-col items-center rounded bg-transparent p-3 hover:bg-[#3D3D3D] hover:rounded-lg",
  logoutLabel: "mt-1 text-xs text-gray-400",
};
