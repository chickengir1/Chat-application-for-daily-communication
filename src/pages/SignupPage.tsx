import Button from "@/components/common/Button";
import EmailInput from "@/components/feature/input/EmailInput";
import NicknameInput from "@/components/feature/input/NicknameInput";
import PasswordInput from "@/components/feature/input/PasswordInput";
import { useForm } from "react-hook-form";

export interface SignupFormValues {
  email: string;
  nickname: string;
  password: string;
  password_confirmation: string;
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>();

  // 이메일 인증 상태
  // const [certification, setCertification] = useState(false);

  // 이메일 인증 함수(토글)
  // const handleCertification = () => {
  //   setCertification(!certification);
  // };

  // 스타일 변수
  const inputStyle = `w-[100%] h-[40px] p-2 text-sm border rounded`;
  const errorMessageStyle = `absolute top-[calc(100%+2px)] text-[11px] text-[#E92B2B]`;

  return (
    <div className="min-w-[320px] h-[100vh] px-[3%] flex items-center justify-center">
      <div className="flex w-[100%] h-[80vh] max-w-[1024px] p-[20px] bg-[#505050] rounded-[16px]">
        <div className="flex items-center justify-center w-full sm:w-[50%]">
          <div className="w-full max-w-[300px] px-[16px]">
            <h1 className="text-[32px] text-center font-extrabold text-[#fff] ">
              LOGO
            </h1>
            <p className="mt-[48px] sm:mt-[80px] text-[18px] font-bold text-[#fff]">
              회원가입
            </p>
            <form
              className="flex flex-col gap-[24px] mt-[16px]"
              onSubmit={handleSubmit(async (data) => {
                // await new Promise((r) => setTimeout(r, 3000));
                // alert(JSON.stringify(data));
                const requestData = {
                  nickname: data.nickname,
                  email: data.email,
                  password: data.password,
                  password_confirmation: data.password_confirmation,
                };
                console.log(requestData);
              })}
            >
              {/* 이메일 */}
              <div className="flex gap-[8px] relative">
                <EmailInput
                  register={register}
                  name="email"
                  error={errors.email}
                />
                <Button text="중복확인" />
              </div>

              {/* 이메일 인증하기 */}
              {/* <div>
                <Button
                  text="이메일 인증하기"
                  width="100%"
                  onClick={handleCertification}
                />
                {certification && (
                  <div className="flex gap-[8px] mt-[8px] relative">
                    <input
                      type="text"
                      placeholder="인증번호를 입력하세요."
                      className={inputStyle}
                    />
                    <Button text="인증하기" />
                    <p className="absolute left-[0px] top-[calc(100%+2px)] text-[11px] text-[#00ff00]">
                      인증메시지 보류
                    </p>
                  </div>
                )}
              </div> */}

              {/* 닉네임 */}
              <div className="flex gap-[8px] relative">
                <NicknameInput register={register} errors={errors} />
                <Button text="중복확인" />
              </div>

              {/* 비밀번호 */}
              <div className="relative">
                <PasswordInput register={register} errors={errors} />
              </div>

              {/* 비밀번호 확인 */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="비밀번호 확인을 입력하세요."
                  className={inputStyle}
                  {...register("password_confirmation", {
                    required: "비밀번호 확인은 필수 입력 사항입니다.",
                    validate: (value) => {
                      if (value !== watch("password")) {
                        return "비밀번호가 일치하지 않습니다.";
                      }
                      return true;
                    },
                  })}
                />
                {errors.password_confirmation && (
                  <p className={errorMessageStyle}>
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>

              <Button type="submit" text="회원가입" disabled={isSubmitting} />
            </form>
          </div>
        </div>
        <div className="hidden sm:block w-[50%] bg-[#d9d9d9] rounded-[16px]"></div>
      </div>
    </div>
  );
};

export default SignUpPage;
