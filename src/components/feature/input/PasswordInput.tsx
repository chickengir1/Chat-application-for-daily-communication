import { SignupFormValues } from "@/pages/SignupPage";
import { UseFormRegister, FieldError } from "react-hook-form";
import { inputStyle } from "./inputStyle";

interface PasswordInputProps {
  register: UseFormRegister<SignupFormValues>;
  errors: { password?: FieldError };
}

const PasswordInput = ({ register }: PasswordInputProps) => {
  return (
    <>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요."
        className={inputStyle}
        {...register("password", {
          required: "비밀번호는 필수 입력 사항입니다.",
          minLength: {
            value: 8,
            message: "비밀번호는 최소 8자리 이상이어야 합니다.",
          },
          maxLength: {
            value: 16,
            message: "비밀번호는 최대 16자리 이하이어야 합니다.",
          },
          pattern: {
            value: /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/,
            message:
              "비밀번호는 특수문자(!,@,#,$,%,^,&,*) 1개 이상 포함해야 합니다.",
          },
        })}
      />
    </>
  );
};

export default PasswordInput;
