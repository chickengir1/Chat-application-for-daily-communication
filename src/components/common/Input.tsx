import React from "react";

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
}

const Input = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "border p-2 rounded",
  disabled = false,
  maxLength = 20,
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      maxLength={maxLength}
    />
  );
};

export default Input;
