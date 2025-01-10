import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalClassName?: string;
  contentClassName?: string;
  overlayClassName?: string;
  children: ReactNode;
  size?: "small" | "medium" | "large";
}

const Modal = ({
  isOpen,
  onClose,
  modalClassName = "",
  contentClassName = "",
  overlayClassName = "",
  children,
  size = "medium",
}: ModalProps) => {
  const sizeClasses = {
    small: "w-1/4 h-2/4",
    medium: "w-1/2 h-2/4",
    large: "w-3/4 h-2/4",
  };

  if (!isOpen) return null;

  return (
    <div className={overlayClassName} onClick={onClose}>
      <div
        className={` ${sizeClasses[size]} ${contentClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button className={modalClassName} onClick={onClose}>
          모달 닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
