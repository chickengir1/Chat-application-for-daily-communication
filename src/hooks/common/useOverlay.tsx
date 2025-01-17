import { useState } from "react";

export const useOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleOverlay = () => setIsVisible((prev) => !prev);

  const renderOverlay = (content: JSX.Element) => (
    <>
      {isVisible && (
        <div
          className={overlayStyles.overlayBackground}
          onClick={toggleOverlay}
        ></div>
      )}
      <div
        className={`${overlayStyles.overlayContent} ${
          isVisible ? overlayStyles.visible : overlayStyles.hidden
        }`}
      >
        {content}
      </div>
    </>
  );

  return { toggleOverlay, renderOverlay };
};

const overlayStyles = {
  overlayBackground: "fixed inset-0 z-20 bg-black opacity-50",
  overlayContent:
    "fixed left-0 top-0 h-full w-3/4 transform z-30 overflow-y-auto bg-[#505050] text-white transition-transform duration-300 ease-in-out",
  visible: "translate-x-0",
  hidden: "-translate-x-full",
};
