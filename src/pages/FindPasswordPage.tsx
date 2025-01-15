import Button from "@/components/common/Button";
import ErrorMessage from "@/components/feature/input/InputErrorHandler";
import {
  certificationMinLengthMsg,
  certificationMinLengthValue,
  certificationPlaceholder,
  certificationRequireMsg,
  emailRegex,
  emailRegexErrorMsg,
  emailRequiredMsg,
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

interface FindPasswordFormValue {
  email: string;
  certification_number: string;
}

const FindPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<FindPasswordFormValue>({
    mode: "onChange",
  });
  return (
    <div className={joinWrapperStyle}>
      <div className={joinContentsStyle}>
        <div className={joinConLeftStyle}>
          <div className={joinConLeftBoxStyle}>
            <h1 className={joinLogoStyle}>LOGO</h1>
            <p className={joinTitleStyle}>비밀번호 찾기</p>
            <form
              className={joinFormStyle}
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
            >
              {/* 이메일 */}
              <span className="flex gap-[8px] relative">
                <input
                  type="email"
                  className={joinInputStyle}
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
                <ErrorMessage message={errors.email?.message} />
              </span>

              {/* 인증 번호 */}
              <span className="flex gap-[8px] relative">
                <input
                  type="text"
                  className={joinInputStyle}
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
                {/* <Button text="인증하기" /> */}
                <ErrorMessage message={errors.certification_number?.message} />
              </span>
              <Button
                type="submit"
                text="비밀번호 찾기"
                width="100%"
                disabled={!isValid || isSubmitting}
              />
            </form>
          </div>
        </div>
        <div className={joinConRightStyle}></div>
      </div>
    </div>
  );
};

export default FindPasswordPage;
