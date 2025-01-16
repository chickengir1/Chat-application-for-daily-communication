import Button from "@/components/common/Button";
import ErrorMessage from "@/components/feature/input/InputErrorHandler";
import {
  emailPlaceholder,
  emailRegex,
  emailRegexErrorMsg,
  emailRequiredMsg,
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
  joinConRightStyle,
  joinContentsStyle,
  joinFormStyle,
  joinInputStyle,
  joinLogoStyle,
  joinTitleStyle,
  joinWrapperStyle,
} from "@/components/feature/join/joinStyle";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const handleFindPasswordClick = () => {
    navigate("/findpassword");
  };
  const handleSignupClick = () => {
    navigate("/signup");
  };

  // 스타일 변수
  const accountStyle = `
    relative pl-[9px] ml-[8px]
    after:content-[''] after:absolute after:left-[0px]
    after:top-[50%] after:-translate-y-1/2 after:w-[1px]
    after:h-[10px] after:bg-[#e1e1e1]
  `;
  const socialBtnStyle = `flex items-center justify-center gap-[4px] w-[100%] h-[40px] px-[12px]
    font-semibold rounded-[4px]`;

  return (
    <div className={joinWrapperStyle}>
      <div className={joinContentsStyle}>
        <div className={joinConLeftStyle}>
          <div className={joinConLeftBoxStyle}>
            <h1 className={joinLogoStyle}>LOGO</h1>
            <p className={joinTitleStyle}>로그인</p>
            <form
              className={joinFormStyle}
              onSubmit={handleSubmit((data) => {
                // alert(JSON.stringify(data));
                console.log(data);
                navigate("/");
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
                <ErrorMessage message={errors.email?.message} />
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
                <ErrorMessage message={errors.password?.message} />
              </div>

              <Button
                type="submit"
                text="로그인"
                disabled={!isValid || isSubmitting}
              />
            </form>

            <div className="mt-[8px] flex justify-end">
              <button
                type="button"
                className="text-[11px] text-[#fff]"
                onClick={handleFindPasswordClick}
              >
                비밀번호 찾기
              </button>
              <button
                type="button"
                className={`${accountStyle} text-[11px] text-[#fff]`}
                onClick={handleSignupClick}
              >
                회원가입
              </button>
            </div>

            <div className="mt-[20px] flex flex-col gap-[24px] border-t-[1px] border-[#e1e1e1] pt-[24px]">
              <button type="button" className={`${socialBtnStyle} bg-[#fff]`}>
                <img
                  src="assets/images/google_logo.svg"
                  alt="구글 로고"
                  className="w-[28px]"
                />
                <span>구글 로그인</span>
              </button>
            </div>
          </div>
        </div>
        <div className={joinConRightStyle}></div>
      </div>
    </div>
  );
};

export default LoginPage;
