import Button from "@/components/common/Button";
import InputErrorMessage from "@/components/feature/input/InputErrorMessage";
import JoinRightContent from "@/components/feature/join/JoinRightContent";
import {
  emailPlaceholder,
  emailRegex,
  emailRegexErrorMsg,
  emailRequiredMsg,
  nicknameMaxLengthMsg,
  nicknameMaxLengthValue,
  nicknameMinLengthMsg,
  nicknameMinLengthValue,
  nicknamePlaceholder,
  nicknameRegex,
  nicknameRegexErrorMsg,
  nicknameRequiredMsg,
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

interface SignupFormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormValues>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  return (
    <div className={joinWrapperStyle}>
      <div className={joinContentsStyle}>
        <div className={joinConLeftStyle}>
          <div className={joinConLeftBoxStyle}>
            <h1 className={joinLogoStyle}>LOGO</h1>
            <p className={joinTitleStyle}>회원가입</p>
            <form
              className={joinFormStyle}
              onSubmit={handleSubmit((data) => {
                // alert(JSON.stringify(data));
                // console.log(data);
                alert(`가입을 축하드립니다. ${data.nickname}님`);
                navigate("/login");
              })}
            >
              {/* 이메일 */}
              <div className="relative">
                <input
                  type="email"
                  className={joinInputStyle}
                  placeholder={emailPlaceholder}
                  {...register("email", {
                    required: emailRequiredMsg,
                    pattern: {
                      value: emailRegex,
                      message: emailRegexErrorMsg,
                    },
                  })}
                />
                <InputErrorMessage message={errors.email?.message} />
              </div>

              {/* 닉네임 */}
              <div className="relative">
                <input
                  type="text"
                  className={joinInputStyle}
                  placeholder={nicknamePlaceholder}
                  {...register("nickname", {
                    required: nicknameRequiredMsg,
                    minLength: {
                      value: nicknameMinLengthValue,
                      message: nicknameMinLengthMsg,
                    },
                    maxLength: {
                      value: nicknameMaxLengthValue,
                      message: nicknameMaxLengthMsg,
                    },
                    pattern: {
                      value: nicknameRegex,
                      message: nicknameRegexErrorMsg,
                    },
                  })}
                />
                <InputErrorMessage message={errors.nickname?.message} />
              </div>

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
                text="가입하기"
                disabled={!isValid || isSubmitting}
              />
            </form>
          </div>
        </div>
        <JoinRightContent />
      </div>
    </div>
  );
};

export default SignUpPage;
