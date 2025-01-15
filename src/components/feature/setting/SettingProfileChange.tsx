import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../input/InputErrorHandler";
import {
  settingButtonStyle,
  settingInputStyle,
  settingSubTitleStyle,
  settingTitleStyle,
} from "./settingStyle";

import {
  nicknameMaxLengthMsg,
  nicknameMaxLengthValue,
  nicknameMinLengthMsg,
  nicknameMinLengthValue,
  nicknamePlaceholder,
  nicknameRequiredMsg,
} from "../join/joinRule";

interface SettingProfileChangeFormValues {
  nickname: string;
  status_message: string;
}

const SettingProfileChange = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SettingProfileChangeFormValues>({
    mode: "onChange",
  });

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
      <h2 className={settingTitleStyle}>프로필 변경</h2>
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
        <form
          className="w-full"
          onSubmit={handleSubmit((data) => {
            alert(JSON.stringify(data));
          })}
        >
          <div className="flex flex-col gap-[24px] sm:w-[320px] mt-[24px] sm:mt-[0]">
            {/* 이메일 */}
            <span>
              <p className={settingSubTitleStyle}>이메일</p>
              <input
                type="email"
                className={settingInputStyle}
                value="test123@gmail.com"
                disabled={true}
              />
            </span>

            {/* 이름 */}
            <span className="relative">
              <p className={settingSubTitleStyle}>이름</p>
              <input
                type="text"
                className={settingInputStyle}
                placeholder={nicknamePlaceholder}
                // value="닉네임이다요"
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
                })}
              />
              <ErrorMessage message={errors.nickname?.message} />
            </span>

            {/* 상태 메시지 */}
            <span className="relative">
              <p className={settingSubTitleStyle}>상태 메시지</p>
              <input
                type="text"
                className={settingInputStyle}
                placeholder="상태 메시지를 입력하세요."
                // value="상태 메시지다요."
                {...register("status_message", {
                  maxLength: {
                    value: 30,
                    message: "상태 메시지는 최대 30자 까지 작성 가능합니다.",
                  },
                })}
              />
              <ErrorMessage message={errors.status_message?.message} />
            </span>
          </div>
          <button
            type="submit"
            className={settingButtonStyle}
            disabled={!isValid || isSubmitting}
          >
            변경사항 저장
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingProfileChange;
