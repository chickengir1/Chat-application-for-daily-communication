export interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  width?: string;
  height?: string;
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  text,
  type = "button",
  width,
  height,
  disabled = false,
  className = `h-10 px-3 text-[14px] font-semibold whitespace-nowrap	rounded-sm ${
    disabled ? "bg-[#a6a6a6] text-[#d6d6d6]" : "bg-[#e7e7e7] text-[#333]"
  }`,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={className}
      style={{ width, height }}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
