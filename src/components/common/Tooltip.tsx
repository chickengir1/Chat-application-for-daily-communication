import { ReactNode, useState } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max p-2 bg-gray-800 text-white text-sm rounded bg-opacity-75 shadow-lg z-10">
          {text}
        </div>
      )}
    </div>
  );
}
