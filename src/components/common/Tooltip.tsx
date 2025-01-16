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
        <div className="absolute bottom-full left-1/2 z-10 mb-2 w-max -translate-x-1/2 transform rounded bg-gray-800 bg-opacity-75 p-2 text-sm text-white shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
}
