import Button from "@/components/common/Button";
import InputErrorMessage from "@/components/feature/input/InputErrorMessage";
import JoinRightContent from "@/components/feature/join/JoinRightContent";
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
} from "@/components/feature/join/joinRule";
import {
  joinConLeftBoxStyle,
  joinConLeftStyle,
  joinContentsStyle,
  joinFormStyle,
  joinInputStyle,
  joinLogoStyle,
  joinTitleStyle,
  joinWrapperStyle,
} from "@/components/feature/join/joinStyle";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface ChangePasswordFormValues {
  password: string;
  passwordConfirmation: string;
}

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  return (
    <div className={joinWrapperStyle}>
      <div className={joinContentsStyle}>
        <div className={joinConLeftStyle}>
          <div className={joinConLeftBoxStyle}>
            <h1 className={joinLogoStyle}>LOGO</h1>
            <p className={joinTitleStyle}>비밀번호 변경</p>
            <form
              className={joinFormStyle}
              onSubmit={handleSubmit((data) => {
                console.log(data);
                navigate('/login')
              })}
            >
              {/* 비밀번호 */}
              <div className="relative">
                <input
                  type="password"
                  className={joinInputStyle}
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

              {/* 비밀번호 확인 */}
              <div className="relative">
                <input
                  type="password"
                  className={joinInputStyle}
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
                <InputErrorMessage
                  message={errors.passwordConfirmation?.message}
                />
              </div>
              <Button
                type="submit"
                text="비밀번호 변경"
                disabled={isSubmitting}
              />
            </form>
          </div>
        </div>
        <JoinRightContent />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
