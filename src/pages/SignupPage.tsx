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
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// const checkEmailDuplicate = async (email: string): Promise<boolean> => {
//   const duplicateEmails = ["test@example.com", "user@example.com"];
//   return duplicateEmails.includes(email);
// };

// const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
//   const duplicateNicknames = ["admin", "tester"];
//   return duplicateNicknames.includes(nickname);
// };

const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  // 실제 서버 API 호출 코드 (예시로 /api/check-email 엔드포인트 호출)
  try {
    const response = await axios.post("/api/check-email", { email });
    return response.data.exists;
  } catch (error) {
    console.error("이메일 중복 확인 실패", error);
    return false;
  }
};

const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
  // 실제 서버 API 호출 코드 (예시로 /api/check-nickname 엔드포인트 호출)
  try {
    const response = await axios.post("/api/check-nickname", { nickname });
    return response.data.exists;
  } catch (error) {
    console.error("닉네임 중복 확인 실패", error);
    return false;
  }
};

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
    setError,
    // clearErrors,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  // const handleFormSubmit = async (data: SignupFormValues) => {
  //   const { email, nickname } = data;

  //   // 이메일 중복 확인
  //   const isEmailDuplicate = await checkEmailDuplicate(email);
  //   if (isEmailDuplicate) {
  //     setError("email", { message: "이미 사용 중인 이메일입니다." });
  //     setFocus("email");
  //     return;
  //   }

  //   // 닉네임 중복 확인
  //   const isNicknameDuplicate = await checkNicknameDuplicate(nickname);
  //   if (isNicknameDuplicate) {
  //     setError("nickname", { message: "이미 사용 중인 닉네임입니다." });
  //     setFocus("nickname");
  //     return;
  //   }

  //   clearErrors();
  //   alert(`가입을 축하드립니다. ${nickname}님`);
  //   navigate("/login");
  // };
  
  const handleFormSubmit = async (data: SignupFormValues) => {
    const { email, nickname, password, passwordConfirmation } = data;

    // 이메일 중복 확인
    const isEmailDuplicate = await checkEmailDuplicate(email);
    if (isEmailDuplicate) {
      setError("email", { message: "이미 사용 중인 이메일입니다." });
      setFocus("email");
      return;
    }

    // 닉네임 중복 확인
    const isNicknameDuplicate = await checkNicknameDuplicate(nickname);
    if (isNicknameDuplicate) {
      setError("nickname", { message: "이미 사용 중인 닉네임입니다." });
      setFocus("nickname");
      return;
    }

    // 비밀번호 확인
    if (password !== passwordConfirmation) {
      setError("passwordConfirmation", { message: "비밀번호가 일치하지 않습니다." });
      setFocus("passwordConfirmation");
      return;
    }

    // 서버에 회원가입 요청
    try {
      const response = await axios.post("/api/register", {
        email,
        nickname,
        password,
        password_confirmation: passwordConfirmation,
      });

      // 응답 처리
      if (response.status === 200) {
        alert("회원가입 성공: " + response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("회원가입 실패", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={joinWrapperStyle}>
      <div className={joinContentsStyle}>
        <div className={joinConLeftStyle}>
          <div className={joinConLeftBoxStyle}>
            <h1 className={joinLogoStyle}>LOGO</h1>
            <p className={joinTitleStyle}>회원가입</p>
            <form
              className={joinFormStyle}
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              {/* 이메일 */}
              <div className="relative">
                <input
                  type="email"
                  className={joinInputStyle}
                  placeholder={emailPlaceholder}
                  required={false}
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

export default SignUpPage;
