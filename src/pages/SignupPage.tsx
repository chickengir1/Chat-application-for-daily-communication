import Button from "@/components/common/Button";
import InputErrorMessage from "@/components/feature/input/InputErrorMessage";
import JoinRightContent from "@/components/feature/join/JoinRightContent";
import {
  certificationPlaceholder,
  certificationRequireMsg,
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
} from "@/utils/joinRule";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "@/hooks/api/useSignup";

const correctCertification = "111111";
const dummyNicknames = ["testuser", "admin"];

interface SignupFormValues {
  email: string;
  certification: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpPage = () => {
  const [emailStatus, setEmailStatus] = useState(false); // 이메일 상태
  const [certificationStatus, setCertificationStatus] = useState(false); // 인증번호 상태
  const [nicknameStatus, setNicknameStatus] = useState(false); // 닉네임 상태

  const { emailExists } = useSignup();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    mode: "onSubmit",
  });

  const onSubmit = async (data: SignupFormValues) => {
    if (!emailStatus) {
      setError("email", {
        type: "manual",
        message: "이메일 중복확인을 완료해주세요.",
      });
      return;
    }

    if (!certificationStatus) {
      setError("certification", {
        type: "manual",
        message: "인증번호를 확인해주세요.",
      });
      return;
    }

    if (!nicknameStatus) {
      setError("nickname", {
        type: "manual",
        message: "닉네임 중복확인을 완료해주세요.",
      });
      return;
    }

    const userData = {
      nickname: data.nickname,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    };

    console.log(userData);
    alert("가입하기 완료");
  };

  const checkEmailDuplication = async () => {
    const email = watch("email");

    if (!email) {
      setError("email", {
        type: "manual",
        message: emailRequiredMsg,
      });
      setEmailStatus(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setError("email", {
        type: "manual",
        message: emailRegexErrorMsg,
      });
      setEmailStatus(false);
      return;
    }

    if (await emailExists(email)) {
      setError("email", {
        type: "manual",
        message: "이미 사용 중인 이메일입니다.",
      });
      setEmailStatus(false);
      return;
    }

    clearErrors("email");
    setEmailStatus(true);
    setError("email", {
      type: "manual",
      message: "사용 가능한 이메일입니다.",
    });
  };

  const handleEmailChange = () => {
    clearErrors("email");
    setEmailStatus(false);
    setValue("certification", "");
    setCertificationStatus(false);
    clearErrors("certification");
  };

  const checkCertification = () => {
    const certification = watch("certification");

    if (!certification) {
      setError("certification", {
        type: "manual",
        message: certificationRequireMsg,
      });
      setCertificationStatus(false);
      return;
    }

    if (certification === correctCertification) {
      clearErrors("certification");
      setCertificationStatus(true);
      setError("certification", {
        type: "manual",
        message: "인증되었습니다.",
      });
    } else {
      setError("certification", {
        type: "manual",
        message: "유효하지 않은 인증번호입니다.",
      });
      setCertificationStatus(false);
    }
  };

  const handleCertificationChange = () => {
    clearErrors("certification");
    setCertificationStatus(false);
  };

  const checkNicknameDuplication = () => {
    const nickname = watch("nickname");

    if (!nickname) {
      setError("nickname", {
        type: "manual",
        message: nicknameRequiredMsg,
      });
      setNicknameStatus(false);
      return;
    }

    if (!nicknameRegex.test(nickname)) {
      setError("nickname", {
        type: "manual",
        message: nicknameRegexErrorMsg,
      });
      setNicknameStatus(false);
      return;
    }

    if (dummyNicknames.includes(nickname)) {
      setError("nickname", {
        type: "manual",
        message: "이미 사용 중인 닉네임입니다.",
      });
      setNicknameStatus(false);
      return;
    }

    clearErrors("nickname");
    setNicknameStatus(true);
    setError("nickname", {
      type: "manual",
      message: "사용 가능한 닉네임입니다.",
    });
  };

  const handleNicknameChange = () => {
    clearErrors("nickname");
    setNicknameStatus(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.leftContainer}>
          <div className={styles.formContent}>
            <h1 className={styles.logo}>LOGO</h1>
            <p className={styles.formTitle}>회원가입</p>
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {/* 이메일 */}
              <div className={styles.inputWrapper}>
                <span className="flex gap-[8px]">
                  <input
                    type="email"
                    className={styles.inputField}
                    placeholder={emailPlaceholder}
                    {...register("email", {
                      required: emailRequiredMsg,
                      pattern: {
                        value: emailRegex,
                        message: emailRegexErrorMsg,
                      },
                    })}
                    onChange={handleEmailChange}
                    autoComplete="off"
                  />
                  <Button text="중복확인" onClick={checkEmailDuplication} />
                </span>
                <InputErrorMessage
                  message={errors.email?.message}
                  color={
                    errors.email?.message === "사용 가능한 이메일입니다."
                      ? "#48cd48"
                      : "#ff6161"
                  }
                />
              </div>

              {/* 인증번호 */}
              {emailStatus && (
                <div className={styles.inputWrapper}>
                  <span className="flex gap-[8px]">
                    <input
                      type="text"
                      className={styles.inputField}
                      placeholder={certificationPlaceholder}
                      maxLength={6}
                      {...register("certification", {
                        required: certificationRequireMsg,
                      })}
                      onChange={handleCertificationChange}
                      autoComplete="off"
                    />
                    <Button text="인증하기" onClick={checkCertification} />
                  </span>
                  <InputErrorMessage
                    message={errors.certification?.message}
                    color={
                      errors.certification?.message === "인증되었습니다."
                        ? "#48cd48"
                        : "#ff6161"
                    }
                  />
                </div>
              )}

              {/* 닉네임 */}
              <div className={styles.inputWrapper}>
                <span className="flex gap-[8px]">
                  <input
                    type="text"
                    className={styles.inputField}
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
                    onChange={handleNicknameChange}
                    autoComplete="off"
                  />
                  <Button text="중복확인" onClick={checkNicknameDuplication} />
                </span>
                <InputErrorMessage
                  message={errors.nickname?.message}
                  color={
                    errors.nickname?.message === "사용 가능한 닉네임입니다."
                      ? "#48cd48"
                      : "#ff6161"
                  }
                />
              </div>

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

              <Button type="submit" text="가입하기" disabled={isSubmitting} />
            </form>
          </div>
        </div>
        <JoinRightContent />
      </div>
    </div>
  );
};

export default SignUpPage;

const styles = {
  pageContainer:
    "flex h-[100vh] min-w-[320px] items-center justify-center px-[3%]",
  formWrapper:
    "flex h-[80vh] w-[100%] max-w-[1024px] rounded-[16px] bg-[#505050] p-[20px]",
  leftContainer: "flex w-full items-center justify-center sm:w-[50%]",
  formContent: "w-full max-w-[320px] px-[16px]",
  logo: "text-center text-[32px] font-extrabold text-[#fff]",
  formTitle: "mt-[48px] text-[18px] font-bold text-[#fff] sm:mt-[80px]",
  form: "mt-[16px] flex flex-col gap-[24px]",
  inputWrapper: "relative",
  inputField: "h-[40px] w-[100%] rounded border p-2 text-sm text-[#333]",
};
