import { UseFormRegister, FieldError, UseFormWatch } from "react-hook-form";
import { SignupFormValues } from "@/pages/SignupPage";

interface PasswordConfirmationInputProps {
  register: UseFormRegister<SignupFormValues>;
  errors?: { password_confirmation?: FieldError };
  watch: UseFormWatch<SignupFormValues>;
}

const PasswordConfirmationInput = ({
  register,
  watch,
}: PasswordConfirmationInputProps) => {
  return (
    <>
      <input
        type="password"
        placeholder="비밀번호 확인을 입력하세요."
        className="w-[100%] h-[40px] p-2 text-sm border rounded text-[#333]"
        {...register("password_confirmation", {
          required: "비밀번호 확인은 필수 입력 사항입니다.",
          validate: (value) => {
            if (value !== watch("password")) {
              return "비밀번호가 일치하지 않습니다.";
            }
            return true;
          },
        })}
      />
    </>
  );
};

export default PasswordConfirmationInput;
