import testImg from "@/assets/images/test_img.svg";

export interface IconButtonProps {
  type: "button" | "submit" | "reset";
  width: string;
  height: string;
  src: string;
  alt: string;
  disabled: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = ({
  type = "button",
  width = "60px",
  height = "60px",
  src = testImg,
  alt,
  disabled = false,
  onClick,
}: IconButtonProps) => {
  return (
    <button
      type={type}
      style={{ width, height }}
      disabled={disabled}
      onClick={onClick}
    >
      <img src={src} alt={alt} className="w-[100%]" />
    </button>
  );
};

export default IconButton;
