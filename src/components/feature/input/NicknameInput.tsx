import { SignupFormValues } from "@/pages/SignupPage";
import { UseFormRegister, FieldError } from "react-hook-form";

interface NicknameInputProps {
  register: UseFormRegister<SignupFormValues>;
  errors: { nickname?: FieldError };
}

const NicknameInput = ({ register, errors }: NicknameInputProps) => {
  return (
    <>
      <input
        type="text"
        placeholder="닉네임을 입력하세요."
        className="w-[100%] h-[40px] p-2 text-sm border rounded text-[#333]"
        {...register("nickname", {
          required: "닉네임은 필수 입력 사항입니다.",
          minLength: {
            value: 2,
            message: "닉네임은 최소 2자리 이상이어야 합니다.",
          },
          maxLength: {
            value: 8,
            message: "닉네임은 최대 8자리 이하이어야 합니다.",
          },
          pattern: {
            value: /^[a-zA-Z가-힣]{2,8}$/,
            message: "유효하지 않은 닉네임 형식입니다.",
          },
        })}
      />

      {errors.nickname && (
        <p className="absolute top-[calc(100%+2px)] text-[11px] text-[#E92B2B]">
          {errors.nickname.message}
        </p>
      )}
    </>
  );
};

export default NicknameInput;
