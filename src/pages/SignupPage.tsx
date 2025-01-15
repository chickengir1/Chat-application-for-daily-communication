import Button from "@/components/common/Button";
import EmailInput from "@/components/feature/input/EmailInput";
import ErrorMessage from "@/components/feature/input/InputErrorHandler";
import NicknameInput from "@/components/feature/input/NicknameInput";
import PasswordConfirmationInput from "@/components/feature/input/PasswordConfirmationInput";
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
                // const requestData = {
                //   nickname: data.nickname,
                //   email: data.email,
                //   password: data.password,
                //   password_confirmation: data.password_confirmation,
                // };
                alert(JSON.stringify(data));
                console.log(data);
              })}
            >
              {/* 이메일 */}
              <div className="flex gap-[8px] relative">
                <EmailInput register={register} errors={errors} />
                <ErrorMessage message={errors.email?.message} />
                <Button text="중복확인" />
              </div>

              {/* 닉네임 */}
              <div className="flex gap-[8px] relative">
                <NicknameInput register={register} errors={errors} />
                <ErrorMessage message={errors.nickname?.message} />
                <Button text="중복확인" />
              </div>

              {/* 비밀번호 */}
              <div className="relative">
                <PasswordInput register={register} errors={errors} />
                <ErrorMessage message={errors.password?.message} />
              </div>

              {/* 비밀번호 확인 */}
              <div className="relative">
                <PasswordConfirmationInput
                  register={register}
                  errors={errors}
                  watch={watch}
                />
                <ErrorMessage message={errors.password_confirmation?.message} />
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
