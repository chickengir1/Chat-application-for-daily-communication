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
} from "@/utils/joinRule";
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
    formState: { errors, isSubmitting },
  } = useForm<SettingPasswordChangeFormValues>({
    mode: "onChange",
  });

  const handlePasswordChange = (data: SettingPasswordChangeFormValues) => {
    // 현재 비밀번호와 새 비밀번호가 동일한지 확인
    if (data.currentPassword === data.password) {
      console.log("현재 비밀번호와 새 비밀번호는 같을 수 없습니다.");
      return; // 동일한 경우에는 제출을 방지합니다.
    }

    console.log("비밀번호가 성공적으로 변경되었습니다.");
    // 비밀번호 변경 로직 처리
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>비밀번호 변경</h2>
      <form onSubmit={handleSubmit(handlePasswordChange)}>
        <div className={styles.formWrapper}>
          {/* 현재 비밀번호 */}
          <div className={styles.inputWrapper}>
            <p className={styles.inputLabel}>현재 비밀번호</p>
            <input
              type="password"
              className={styles.input}
              placeholder="현재 비밀번호를 입력하세요."
              {...register("currentPassword", {
                required: passwordRequiredMsg,
              })}
            />
            <InputErrorMessage message={errors.currentPassword?.message} />
          </div>

          {/* 새 비밀번호 */}
          <div className={styles.inputWrapper}>
            <p className={styles.inputLabel}>새 비밀번호</p>
            <input
              type="password"
              className={styles.input}
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
          <div className={styles.inputWrapper}>
            <p className={styles.inputLabel}>새 비밀번호 확인</p>
            <input
              type="password"
              className={styles.input}
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
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "요청중..." : "변경사항 저장"}
        </button>
      </form>
    </div>
  );
};

export default SettingPasswordChange;

const styles = {
  container: "mt-[40px] border-t border-[#e1e1e1] pt-[50px]",
  title: "mb-[28px] text-[18px] font-bold sm:text-[22px]",
  formWrapper:
    "mt-[16px] flex w-[100%] flex-col gap-[24px] sm:mt-[0px] sm:max-w-[320px]",
  inputWrapper: "relative",
  inputLabel: "mb-[4px] font-bold",
  input: "h-[40px] w-[100%] rounded border p-2 text-sm text-[#333]",
  submitButton:
    "ml-auto mt-[24px] block h-10 w-[100%] whitespace-nowrap rounded-sm bg-[#e7e7e7] px-3 text-[14px] font-semibold text-[#333] disabled:cursor-not-allowed disabled:bg-[#a6a6a6] disabled:text-[#d6d6d6] sm:w-[auto]",
};
