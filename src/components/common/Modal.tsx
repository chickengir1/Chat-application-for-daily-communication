import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentClassName?: string;
  overlayClassName?: string;
  children: ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  contentClassName = "",
  overlayClassName = "",
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${overlayClassName}`}
      onClick={onClose}
    >
      <div
        className={`relative max-h-[90%] w-11/12 overflow-y-auto rounded-lg bg-[#404040] p-6 text-white sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4 ${contentClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-300 hover:text-white"
        >
          <FaTimes size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
