import {
  buttonStyle,
  inputStyle,
  settingBoxStyle,
  subTitleStyle,
  titleStyle,
} from "./settingStyle";
import PasswordInput from "../input/PasswordInput";
import ErrorMessage from "../input/InputErrorHandler";
import PasswordConfirmationInput from "../input/PasswordConfirmationInput";
import { useForm } from "react-hook-form";
import { SignupFormValues } from "@/pages/SignupPage";

const PasswordChange = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>();

  return (
    <div className="mt-[40px] pt-[50px] border-t border-[#e1e1e1]">
      <h2 className={titleStyle}>비밀번호 변경</h2>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div className={settingBoxStyle}>
          {/* 현재 비밀번호 */}
          <span>
            <p className={subTitleStyle}>현재 비밀번호</p>
            <input
              type="text"
              className={inputStyle}
              placeholder="현재 비밀번호를 입력하세요."
            />
          </span>

          {/* 새 비밀번호 */}
          <span className="relative">
            <p className={subTitleStyle}>새 비밀번호</p>
            <PasswordInput register={register} errors={errors} />
            <ErrorMessage message={errors.password?.message} />
          </span>

          {/* 새 비밀번호 확인 */}
          <span className="relative">
            <p className={subTitleStyle}>새 비밀번호 확인</p>
            <PasswordConfirmationInput
              register={register}
              errors={errors}
              watch={watch}
            />
            <ErrorMessage message={errors.password_confirmation?.message} />
          </span>
        </div>
        <button type="submit" className={buttonStyle} disabled={isSubmitting}>
          변경사항 저장
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
