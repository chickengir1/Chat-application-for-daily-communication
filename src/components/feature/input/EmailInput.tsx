import { UseFormRegister, FieldError } from "react-hook-form";
import { SignupFormValues } from "@/pages/SignupPage";
import { inputStyle } from "./inputStyle";

interface EmailInputProps {
  register: UseFormRegister<SignupFormValues>;
  errors: { email?: FieldError };
}

const EmailInput = ({ register }: EmailInputProps) => {
  return (
    <>
      <input
        type="email"
        placeholder="이메일을 입력하세요."
        className={inputStyle}
        {...register("email", {
          required: "이메일은 필수 입력 사항입니다.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "유효하지 않은 이메일 형식입니다.",
          },
        })}
      />
    </>
  );
};

export default EmailInput;
