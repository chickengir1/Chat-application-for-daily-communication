import { UseFormRegister, FieldError } from "react-hook-form";
import { SignupFormValues } from "@/pages/SignupPage";

interface EmailInputProps {
  register: UseFormRegister<SignupFormValues>;
  name: keyof SignupFormValues;
  error?: FieldError;
}

const EmailInput: React.FC<EmailInputProps> = ({ register, name, error }) => {
  return (
    <>
      <input
        type="email"
        placeholder="이메일을 입력하세요."
        className="w-[100%] h-[40px] p-2 text-sm border rounded text-[#333]"
        {...register(name, {
          required: "이메일은 필수 입력 사항입니다.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "유효하지 않은 이메일 형식입니다.",
          },
        })}
      />
      {error && (
        <p className="absolute top-[calc(100%+2px)] text-[11px] text-[#E92B2B]">
          {error.message}
        </p>
      )}
    </>
  );
};

export default EmailInput;
