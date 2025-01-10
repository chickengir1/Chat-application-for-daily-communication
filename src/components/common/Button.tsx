export interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
  width: string;
  height: string;
  disabled: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  text,
  type = "button",
  width,
  height,
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`h-10 px-3 text-base font-semibold rounded-sm ${
        disabled ? "bg-[#a6a6a6] text-[#d6d6d6]" : "bg-[#e7e7e7] text-333"
      }`}
      style={{ width, height }}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
