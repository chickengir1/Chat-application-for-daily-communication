import Button from "@/components/common/Button";
import InputErrorMessage from "@/components/feature/input/InputErrorMessage";
import JoinRightContent from "@/components/feature/join/JoinRightContent";
import { useAuth } from "@/hooks/api/useAuth";
import {
  emailPlaceholder,
  emailRequiredMsg,
  passwordPlaceholder,
  passwordRequiredMsg,
} from "@/utils/joinRule";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    watch,
    register,
    handleSubmit: onSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const { email, password } = watch();

  const { signIn } = useAuth();

  const navigate = useNavigate();

  const handleFindPasswordClick = () => {
    navigate("/findpassword");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    if (await signIn(data)) {
      navigate("/", { replace: true });
    } else {
      // TODO: 나중에 로그인 실패 부분 좀 더 고도화해서 처리할 것
      alert("로그인에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginWrapper}>
        <div className={styles.formWrapper}>
          <div className={styles.formContent}>
            <h1 className={styles.logo}>LOGO</h1>
            <p className={styles.formTitle}>로그인</p>
            <form className={styles.form} onSubmit={onSubmit(handleSubmit)}>
              {/* 이메일 */}
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  className={styles.inputField}
                  placeholder={emailPlaceholder}
                  {...register("email", {
                    required: emailRequiredMsg,
                  })}
                />
                <InputErrorMessage message={errors.email?.message} />
              </div>

              {/* 비밀번호 */}
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  className={styles.inputField}
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
                disabled={isSubmitting || !email || !password}
              />
            </form>

            <div className={styles.footer}>
              <button
                type="button"
                className={styles.findPasswordButton}
                onClick={handleFindPasswordClick}
              >
                비밀번호 찾기
              </button>
              <button
                type="button"
                className={styles.signupButton}
                onClick={handleSignupClick}
              >
                회원가입
              </button>
            </div>

            <div className={styles.googleLoginWrapper}>
              <button type="button" className={styles.googleLoginButton}>
                <img
                  src="assets/images/google_logo.svg"
                  alt="구글 로고"
                  className={styles.googleLogo}
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

const styles = {
  pageContainer:
    "flex h-[100vh] min-w-[320px] items-center justify-center px-[3%]",
  loginWrapper:
    "flex h-[80vh] w-[100%] max-w-[1024px] rounded-[16px] bg-[#505050] p-[20px]",
  formWrapper: "flex w-full items-center justify-center sm:w-[50%]",
  formContent: "w-full max-w-[320px] px-[16px]",
  logo: "text-center text-[32px] font-extrabold text-[#fff]",
  formTitle: "mt-[48px] text-[18px] font-bold text-[#fff] sm:mt-[80px]",
  form: "mt-[16px] flex flex-col gap-[24px]",
  inputWrapper: "relative",
  inputField: "h-[40px] w-[100%] rounded border p-2 text-sm text-[#333]",
  footer: "mt-[8px] flex justify-end",
  findPasswordButton: "text-[11px] text-[#fff]",
  signupButton:
    "relative ml-[8px] pl-[9px] text-[11px] text-[#fff] after:absolute after:left-[0px] after:top-[50%] after:h-[10px] after:w-[1px] after:-translate-y-1/2 after:bg-[#e1e1e1] after:content-['']",
  googleLoginWrapper: "mt-[20px] border-t-[1px] border-[#e1e1e1] pt-[24px]",
  googleLoginButton:
    "flex h-[40px] w-full items-center justify-center gap-[4px] rounded-[4px] bg-[#fff] text-[14px] font-bold",
  googleLogo: "w-[20px]",
};
