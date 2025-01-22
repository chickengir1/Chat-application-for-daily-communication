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
} from "@/utils/joinRule";
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
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.leftSide}>
          <div className={styles.formWrapper}>
            <h1 className={styles.logo}>LOGO</h1>
            <p className={styles.pageTitle}>비밀번호 변경</p>
            <form
              className={styles.form}
              onSubmit={handleSubmit((data) => {
                console.log(data);
                navigate("/login");
              })}
            >
              {/* 비밀번호 */}
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  className={styles.inputField}
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
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  className={styles.inputField}
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

const styles = {
  pageContainer:
    "flex h-[100vh] min-w-[320px] items-center justify-center px-[3%]",
  formContainer:
    "flex h-[80vh] w-full max-w-[1024px] rounded-[16px] bg-[#505050] p-[20px]",
  leftSide: "flex w-full items-center justify-center sm:w-[50%]",
  formWrapper: "w-full max-w-[320px] px-[16px]",
  logo: "text-center text-[32px] font-extrabold text-[#fff]",
  pageTitle: "mt-[48px] text-[18px] font-bold text-[#fff] sm:mt-[80px]",
  form: "mt-[16px] flex flex-col gap-[24px]",
  inputWrapper: "relative",
  inputField: "h-[40px] w-[100%] rounded border p-2 text-sm text-[#333]",
};
