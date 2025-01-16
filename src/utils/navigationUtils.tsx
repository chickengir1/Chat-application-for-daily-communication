export const renderIcons = (
  icons: { icon: JSX.Element; label: string; path: string }[],
  direction: "vertical" | "horizontal",
  activeIndex: number,
  handleNavigation: (index: number, path: string) => void
) =>
  icons.map((item, index) => {
    const isActive = activeIndex === index;

    const wrapperStyle =
      direction === "vertical" ? styles.vertical : styles.horizontal;
    const buttonStyle = isActive ? styles.active : styles.inactive;

    return (
      <button
        key={item.label}
        onClick={() => handleNavigation(index, item.path)}
        className={`${styles.baseButton} ${wrapperStyle} ${buttonStyle}`}
      >
        {item.icon}
        <span className={styles.iconLabel}>{item.label}</span>
      </button>
    );
  });

const styles = {
  baseButton: "flex flex-col items-center p-3",
  vertical: "mb-4",
  horizontal: "w-full",
  active:
    "w-full border-b-4 border-gray-500 bg-[#3D3D3D] font-bold text-gray-200",
  inactive: "bg-transparent text-gray-300",
  iconLabel: "mt-1 text-xs",
};
