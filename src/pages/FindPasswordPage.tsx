import Button from "@/components/common/Button";
import InputErrorMessage from "@/components/feature/input/InputErrorMessage";
import JoinRightContent from "@/components/feature/join/JoinRightContent";
import {
  certificationMinLengthMsg,
  certificationMinLengthValue,
  certificationPlaceholder,
  certificationRequireMsg,
  emailRegex,
  emailRegexErrorMsg,
  emailRequiredMsg,
} from "@/utils/joinRule";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FindPasswordFormValue {
  email: string;
  certification_number: string;
}

const FindPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FindPasswordFormValue>({
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.leftSide}>
          <div className={styles.formWrapper}>
            <h1 className={styles.logo}>LOGO</h1>
            <p className={styles.pageTitle}>비밀번호 찾기</p>
            <form
              className={styles.form}
              onSubmit={handleSubmit((data) => {
                console.log(data);
                navigate("/changepassword");
              })}
            >
              {/* 이메일 */}
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  className={styles.inputField}
                  placeholder="이메일을 입력하세요."
                  {...register("email", {
                    required: emailRequiredMsg,
                    pattern: {
                      value: emailRegex,
                      message: emailRegexErrorMsg,
                    },
                  })}
                />
                <Button text="인증요청" />
                <InputErrorMessage message={errors.email?.message} />
              </div>

              {/* 인증 번호 */}
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder={certificationPlaceholder}
                  maxLength={6}
                  {...register("certification_number", {
                    required: certificationRequireMsg,
                    minLength: {
                      value: certificationMinLengthValue,
                      message: certificationMinLengthMsg,
                    },
                  })}
                />
                <InputErrorMessage
                  message={errors.certification_number?.message}
                />
              </div>
              <Button
                type="submit"
                text="비밀번호 찾기"
                width="100%"
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

export default FindPasswordPage;

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
  inputWrapper: "relative flex gap-[8px]",
  inputField: "h-[40px] w-[100%] rounded border p-2 text-sm text-[#333]",
};
