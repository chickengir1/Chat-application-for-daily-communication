import { useEffect } from "react";

export interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose?: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  const baseClasses =
    "fixed bottom-4 left-4 p-4 rounded-lg shadow-lg text-white truncate w-64 text-center";
  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div>{message}</div>
      <div className="relative mt-2 h-1 bg-gray-300">
        <div
          className="absolute top-0 left-0 h-1 bg-white animate-progress"
          style={{
            animationDuration: `${3000}ms`,
          }}
        />
      </div>
    </div>
  );
};

export default Toast;
