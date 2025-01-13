import React, { forwardRef } from "react";

interface JoinInputProps {
  type?: string;
  value?: string;
  className?: string;
  width?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const JoinInput = forwardRef<HTMLInputElement, JoinInputProps>(
  (
    {
      type,
      value,
      className = "h-[40px] p-2 text-sm border rounded",
      width,
      placeholder,
      maxLength,
      disabled = false,
      onChange,
    }: JoinInputProps,
    ref
  ) => {
    return (
      <input
        ref={ref} // ref를 전달합니다.
        type={type}
        value={value}
        className={className}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        style={width ? { width } : undefined} // 스타일 수정
        onChange={onChange}
      />
    );
  }
);

JoinInput.displayName = "JoinInput"; // React DevTools에서 컴포넌트 이름을 표시하도록 설정

export default JoinInput;
