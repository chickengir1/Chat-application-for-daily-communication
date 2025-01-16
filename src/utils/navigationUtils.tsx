const getWrapperClass = (direction: "vertical" | "horizontal") =>
  direction === "vertical"
    ? "flex flex-col items-center mb-4"
    : "flex flex-col items-center w-full";

export const renderIcons = (
  icons: { icon: JSX.Element; label: string; path: string }[],
  direction: "vertical" | "horizontal",
  activeIndex: number,
  handleNavigation: (index: number, path: string) => void
) =>
  icons.map((item, index) => {
    const isActive = activeIndex === index;
    const buttonClass = isActive
      ? "bg-[#3D3D3D] text-gray-200 border-gray-500 border-b-4 font-bold w-full"
      : "bg-transparent text-gray-300";

    return (
      <button
        key={item.label}
        onClick={() => handleNavigation(index, item.path)}
        className={`p-3 ${getWrapperClass(direction)} ${buttonClass}`}
      >
        {item.icon}
        <span className="mt-1 text-xs">{item.label}</span>
      </button>
    );
  });
