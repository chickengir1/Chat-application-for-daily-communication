import React from "react";

interface InputProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
}

const Input = ({
  value,
  onChange,
  onKeyDown,
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
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      maxLength={maxLength}
    />
  );
};

export default Input;
