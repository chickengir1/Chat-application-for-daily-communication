export interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  width?: string | number;
  height?: string | number;
  disabled: boolean;
}

const Button = ({
  text,
  type = "button",
  width,
  height,
  disabled = false
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`h-10 px-3 text-base font-semibold rounded-sm ${
        disabled ? "bg-[#000] text-white" : "bg-[#e7e7e7] text-333"
      }`}
      style={{ width, height }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
