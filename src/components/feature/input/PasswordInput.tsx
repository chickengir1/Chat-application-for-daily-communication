import { UseFormRegister, FieldValues, FieldError } from "react-hook-form";

interface PasswordInputProps {
  register: UseFormRegister<FieldValues>;
  errors: { password?: FieldError };
}

const PasswordInput = ({ register, errors }: PasswordInputProps) => {
  return (
    <>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요."
        className="w-[100%] h-[40px] p-2 text-sm border rounded text-[#333]"
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
      {errors.password && (
        <p className="absolute top-[calc(100%+2px)] text-[11px] text-[#E92B2B]">
          {errors.password.message}
        </p>
      )}
    </>
  );
};

export default PasswordInput;
