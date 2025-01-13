import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  // 스타일 변수
  const inputStyle = `w-[100%] h-[40px] p-2 text-sm border rounded`;
  const errorMessageStyle = `absolute top-[calc(100%+2px)] text-[11px] text-[#E92B2B]`;
  const accountStyle = `
    relative text-[11px] pl-[9px] ml-[8px] text-[#fff]
    after:content-[''] after:absolute after:left-[0px]
    after:top-[50%] after:-translate-y-1/2 after:w-[1px]
    after:h-[10px] after:bg-[#e1e1e1]
  `;
  const socialBtnStyle = `flex items-center justify-center gap-[4px] w-[100%] h-[40px] px-[12px]
    font-semibold rounded-[4px]`;

  return (
    <div className="min-w-[320px] h-[100vh] px-[3%] flex items-center justify-center">
      <div className="flex w-[100%] h-[80vh] max-w-[1024px] p-[20px] bg-[#505050] rounded-[16px]">
        <div className="flex items-center justify-center w-full sm:w-[50%]">
          <div className="w-full max-w-[300px] px-[16px]">
            <h1 className="text-[32px] text-center font-extrabold text-[#fff] ">
              LOGO
            </h1>
            <p className="mt-[48px] sm:mt-[80px] text-[18px] font-bold text-[#fff]">
              로그인
            </p>
            <form
              className="flex flex-col gap-[24px] mt-[16px]"
              onSubmit={handleSubmit(async (data) => {
                await new Promise((r) => setTimeout(r, 3000));
                alert(JSON.stringify(data));
              })}
            >
              {/* 이메일 */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="이메일을 입력하세요."
                  className={inputStyle}
                  {...register("email", {
                    required: "이메일은 필수 입력 사항입니다.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "유효하지 않은 이메일 형식입니다.",
                    },
                  })}
                />
                {errors.email && (
                  <p className={errorMessageStyle}>{errors.email.message}</p>
                )}
              </div>

              {/* 비밀번호 */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                  className={inputStyle}
                  {...register("password", {
                    required: "비밀번호는 필수 입력 사항입니다.",
                    minLength: {
                      value: 8,
                      message: "비밀번호는 최소 8자리 이상이어야 합니다.",
                    },
                    maxLength: {
                      value: 16,
                      message: "비밀번호는 최대 16자리 이하이어야 합니다.",
                    },
                    pattern: {
                      value: /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/,
                      message:
                        "비밀번호는 특수문자(!,@,#,$,%,^,&,*) 1개 이상 포함해야 합니다.",
                    },
                  })}
                />
                {errors.password && (
                  <p className={errorMessageStyle}>{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" text="로그인" disabled={isSubmitting} />
            </form>

            <div className="flex justify-end mt-[8px]">
              <button type="button" className="text-[11px] text-[#fff]">
                아이디 찾기
              </button>
              <button type="button" className={accountStyle}>
                비밀번호 찾기
              </button>
              <button type="button" className={accountStyle}>
                회원가입
              </button>
            </div>

            <div className="flex flex-col gap-[24px] pt-[24px] mt-[20px] border-t-[1px] border-[#e1e1e1]">
              <button
                type="button"
                className={`${socialBtnStyle} bg-[#FAE100]`}
              >
                <img src="assets/images/kakao_logo.svg" />
                <span>카카오 로그인</span>
              </button>
              <button
                type="button"
                className={`${socialBtnStyle} bg-[#03C75A] text-[#fff]`}
              >
                <img src="assets/images/naver_logo.svg" />
                <span>네이버 로그인</span>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden sm:block w-[50%] bg-[#d9d9d9] rounded-[16px]"></div>
      </div>
    </div>
  );
};

export default LoginPage;
