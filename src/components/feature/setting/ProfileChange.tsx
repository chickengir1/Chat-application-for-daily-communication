import { useState } from "react";
import {
  buttonStyle,
  inputStyle,
  settingBoxStyle,
  subTitleStyle,
  titleStyle,
} from "./settingStyle";
import NicknameInput from "../input/NicknameInput";
import ErrorMessage from "../input/InputErrorHandler";
import { useForm } from "react-hook-form";
import { SignupFormValues } from "@/pages/SignupPage";

const ProfileChange = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>();

  // 이미지 업로드 상태
  const defaultImg = "/assets/images/default_profile.svg";
  const [previewImg, setPreviewImg] = useState<string | undefined>(defaultImg);

  // 이미지 업로드 핸들러
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className={titleStyle}>프로필 변경</h2>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div className="sm:flex gap-[68px]">
          {/* 프로필 사진 */}
          <div className="flex flex-col items-center gap-[20px]">
            {/* 이미지 미리보기 */}
            <img
              src={previewImg}
              alt="미리보기"
              className="w-[100px] h-[100px] object-cover rounded-full border-[1px] border-[#e1e1e1]"
            />

            {/* 파일 입력 */}
            <input
              type="file"
              id="profile"
              accept=".png, .jpeg, .jpg, .svg"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="profile"
              className="inline-flex items-center justify-center h-10 px-3 text-[14px] font-semibold
                            whitespace-nowrap	rounded-sm bg-[#e7e7e7] text-[#333] cursor-pointer"
            >
              프로필 사진 변경
            </label>
          </div>

          {/* 개인정보변경 */}
          <div className={settingBoxStyle}>
            {/* 이름 */}
            <span className="relative">
              <p className={subTitleStyle}>이름</p>
              <NicknameInput register={register} errors={errors} />
              <ErrorMessage message={errors.nickname?.message} />
            </span>

            {/* 이메일 */}
            <span>
              <p className={subTitleStyle}>이메일</p>
              <input
                type="email"
                className={inputStyle}
                value="test123@gmail.com"
                disabled={true}
              />
            </span>
          </div>
        </div>
        <button type="submit" className={buttonStyle} disabled={isSubmitting}>
          변경사항 저장
        </button>
      </form>
    </div>
  );
};

export default ProfileChange;
