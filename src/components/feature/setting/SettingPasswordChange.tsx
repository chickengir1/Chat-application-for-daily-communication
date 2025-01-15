import {
  settingBoxStyle,
  settingButtonStyle,
  settingInputStyle,
  settingSubTitleStyle,
  settingTitleStyle,
} from "./settingStyle";
import { useForm } from "react-hook-form";
import ErrorMessage from "../input/InputErrorHandler";
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

interface SettingPasswordChangeFormValues {
  current_password: string;
  password: string;
  password_confirmation: string;
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
    <div className="mt-[40px] pt-[50px] border-t border-[#e1e1e1]">
      <h2 className={settingTitleStyle}>비밀번호 변경</h2>
      <form
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
        <div className={settingBoxStyle}>
          {/* 현재 비밀번호 */}
          <span className="relative">
            <p className={settingSubTitleStyle}>현재 비밀번호</p>
            <input
              type="password"
              className={settingInputStyle}
              placeholder="현재 비밀번호를 입력하세요."
              {...register("current_password", {
                required: passwordRequiredMsg,
              })}
            />
            <ErrorMessage message={errors.current_password?.message} />
          </span>

          {/* 새 비밀번호 */}
          <span className="relative">
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
            <ErrorMessage message={errors.password?.message} />
          </span>

          {/* 새 비밀번호 확인 */}
          <span className="relative">
            <p className={settingSubTitleStyle}>새 비밀번호 확인</p>
            <input
              type="password"
              className={settingInputStyle}
              placeholder={passwordConfirmationPlaceholder}
              {...register("password_confirmation", {
                required: passwordConfirmationRequiredMsg,
                validate: (value) => {
                  return (
                    value === watch("password") ||
                    "비밀번호가 일치하지 않습니다."
                  );
                },
              })}
            />
            <ErrorMessage message={errors.password_confirmation?.message} />
          </span>
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
