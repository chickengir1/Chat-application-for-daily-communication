import {
  settingBoxStyle,
  settingButtonStyle,
  settingInputStyle,
  settingSubTitleStyle,
  settingTitleStyle,
} from "./settingStyle";
import { useForm } from "react-hook-form";
import {
  passwordConfirmationPlaceholder,
  passwordConfirmationRequiredMsg,
  passwordMaxLengthMsg,
  passwordMaxLengthValue,
  passwordMinLengthMsg,
  passwordMinLengthValue,
  passwordPlaceholder,
  passwordRegex,
  passwordRegexErrorMsg,
  passwordRequiredMsg,
} from "../join/joinRule";
import InputErrorMessage from "@/components/feature/input/InputErrorMessage";

interface SettingPasswordChangeFormValues {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

const SettingPasswordChange = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SettingPasswordChangeFormValues>({
    mode: "onChange",
  });

  return (
    <div className="mt-[40px] border-t border-[#e1e1e1] pt-[50px]">
      <h2 className={settingTitleStyle}>비밀번호 변경</h2>
      <form
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
        <div className={settingBoxStyle}>
          {/* 현재 비밀번호 */}
          <div className="relative">
            <p className={settingSubTitleStyle}>현재 비밀번호</p>
            <input
              type="password"
              className={settingInputStyle}
              placeholder="현재 비밀번호를 입력하세요."
              {...register("currentPassword", {
                required: passwordRequiredMsg,
              })}
            />
            <InputErrorMessage message={errors.currentPassword?.message} />
          </div>

          {/* 새 비밀번호 */}
          <div className="relative">
            <p className={settingSubTitleStyle}>새 비밀번호</p>
            <input
              type="password"
              className={settingInputStyle}
              placeholder={passwordPlaceholder}
              {...register("password", {
                required: passwordRequiredMsg,
                minLength: {
                  value: passwordMinLengthValue,
                  message: passwordMinLengthMsg,
                },
                maxLength: {
                  value: passwordMaxLengthValue,
                  message: passwordMaxLengthMsg,
                },
                pattern: {
                  value: passwordRegex,
                  message: passwordRegexErrorMsg,
                },
              })}
            />
            <InputErrorMessage message={errors.password?.message} />
          </div>

          {/* 새 비밀번호 확인 */}
          <div className="relative">
            <p className={settingSubTitleStyle}>새 비밀번호 확인</p>
            <input
              type="password"
              className={settingInputStyle}
              placeholder={passwordConfirmationPlaceholder}
              {...register("passwordConfirmation", {
                required: passwordConfirmationRequiredMsg,
                validate: (value) => {
                  return (
                    value === watch("password") ||
                    "비밀번호가 일치하지 않습니다."
                  );
                },
              })}
            />
            <InputErrorMessage message={errors.passwordConfirmation?.message} />
          </div>
        </div>
        <button
          type="submit"
          className={settingButtonStyle}
          disabled={!isValid || isSubmitting}
        >
          변경사항 저장
        </button>
      </form>
    </div>
  );
};

export default SettingPasswordChange;
