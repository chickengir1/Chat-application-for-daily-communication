import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
}

const Input = ({
  value,
  className = "rounded border p-2",
  maxLength = 20,
  ...inputAttributes
}: InputProps) => {
  return (
    <input
      value={value}
      className={className}
      maxLength={maxLength}
      {...inputAttributes}
    />
  );
};

export default Input;
