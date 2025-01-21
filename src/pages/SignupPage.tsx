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
import { useState } from "react";
import { useForm } from "react-hook-form";

const dummyEmails = ["test@example.com", "user@domain.com"];

interface SignupFormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpPage = () => {
  const [emailDisabled, setEmailDisabled] = useState(false); // 이메일 입력 disabled 상태 추가

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    mode: "onSubmit",
  });

  const onSubmit = () => {
    console.log("가입하기 버튼 눌렀다!");
  };

  // 이메일 유효성/중복확인 체크
  const checkEmailDuplication = () => {
    const email = watch("email");

    if (!email) {
      setError("email", {
        type: "manual",
        message: emailRequiredMsg, // 이메일이 비어 있으면 필수 메시지 표시
      });
      return; // 이메일이 비어 있으면 중복 확인을 하지 않음
    }

    // 이메일 형식 유효성 검사
    if (!emailRegex.test(email)) {
      setError("email", {
        type: "manual",
        message: emailRegexErrorMsg, // 유효하지 않은 이메일 형식 에러 메시지
      });
      return;
    }

    // 중복 이메일 확인 (예시로 dummyEmails 배열과 비교)
    if (dummyEmails.includes(email)) {
      setError("email", {
        type: "manual",
        message: "이미 사용 중인 이메일입니다.",
      });
      return;
    }

    // 이메일 중복이 없다면 이메일 입력 필드를 비활성화하고 alert 표시
    setEmailDisabled(true);
    alert("사용 가능한 이메일입니다.");
  };

  const handleEmailChange = () => {
    // 이메일 입력이 변경될 때마다 에러 메시지를 제거하고, 이메일 확인 상태를 초기화
    clearErrors("email");
    setEmailDisabled(false); // 이메일이 변경되면 disabled 상태 초기화
  };

  return (
    <div className={joinWrapperStyle}>
      <div className={joinContentsStyle}>
        <div className={joinConLeftStyle}>
          <div className={joinConLeftBoxStyle}>
            <h1 className={joinLogoStyle}>LOGO</h1>
            <p className={joinTitleStyle}>회원가입</p>
            <form className={joinFormStyle} onSubmit={handleSubmit(onSubmit)}>
              {/* 이메일 */}
              <div className="relative">
                <span className="flex gap-[8px]">
                  <input
                    type="email"
                    className={joinInputStyle}
                    placeholder={emailPlaceholder}
                    required={false}
                    {...register("email", {
                      required: emailRequiredMsg,
                      // pattern: {
                      //   value: emailRegex,
                      //   message: emailRegexErrorMsg,
                      // },
                    })}
                    onChange={handleEmailChange} // 이메일이 변경될 때마다 에러 메시지 지우기
                    disabled={emailDisabled} // 이메일 중복 확인 후 비활성화 처리
                  />
                  <Button text="중복확인" onClick={checkEmailDuplication} />
                </span>
                <InputErrorMessage message={errors.email?.message} />
              </div>

              {/* 닉네임 */}
              <div className="relative">
                <span className="flex gap-[8px]">
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
                  <Button text="중복확인" />
                </span>
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
