import Button from "@/components/common/Button";
import InputErrorMessage from "@/components/feature/input/InputErrorMessage";
import JoinRightContent from "@/components/feature/join/JoinRightContent";
import {
  emailPlaceholder,
  emailRequiredMsg,
  passwordPlaceholder,
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

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    mode: "onSubmit",
  });

  const navigate = useNavigate();
  const handleFindPasswordClick = () => {
    navigate("/findpassword");
  };
  const handleSignupClick = () => {
    navigate("/signup");
  };

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
                  })}
                />
                <InputErrorMessage message={errors.email?.message} />
              </div>

              {/* 비밀번호 */}
              <div className="relative">
                <input
                  type="password"
                  className={joinInputStyle}
                  placeholder={passwordPlaceholder}
                  {...register("password", {
                    required: passwordRequiredMsg,
                  })}
                />
                <InputErrorMessage message={errors.password?.message} />
              </div>

              <Button
                type="submit"
                text="로그인"
                disabled={isSubmitting}
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
                className="relative pl-[9px] ml-[8px]
                          after:content-[''] after:absolute after:left-[0px]
                          after:top-[50%] after:-translate-y-1/2 after:w-[1px]
                          after:h-[10px] after:bg-[#e1e1e1] text-[11px] text-[#fff]"
                onClick={handleSignupClick}
              >
                회원가입
              </button>
            </div>

            <div className="pt-[24px] mt-[20px] border-t-[1px] border-[#e1e1e1]">
              <button
                type="button"
                className="flex items-center justify-center gap-[4px] w-full h-[40px] text-[14px] font-bold bg-[#fff] rounded-[4px]"
              >
                <img
                  src="assets/images/google_logo.svg"
                  alt="구글 로고"
                  className="w-[20px]"
                />
                <span>구글 로그인</span>
              </button>
            </div>
          </div>
        </div>
        <JoinRightContent />
      </div>
    </div>
  );
};

export default LoginPage;
