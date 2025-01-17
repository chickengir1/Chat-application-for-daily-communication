import { useState } from "react";
import { useForm } from "react-hook-form";
import InputErrorMessage from "@/components/feature/input/InputErrorMessage";
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

const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
  const duplicateNicknames = ["admin", "tester"];
  return duplicateNicknames.includes(nickname);
};

interface SettingProfileChangeFormValues {
  nickname: string;
  statusMessage: string;
}

const SettingProfileChange = () => {
  const [initialNickname] = useState<string>("닉네임이다요");
  const [initialStatusMessage] = useState<string>("상태 메시지다요.");

  const {
    register,
    handleSubmit,
    clearErrors,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SettingProfileChangeFormValues>({
    mode: "onChange",
    defaultValues: {
      nickname: initialNickname,
      statusMessage: initialStatusMessage,
    },
  });

  const handleFormSubmit = async (data: SettingProfileChangeFormValues) => {
    const { nickname, statusMessage } = data;

    // 닉네임 중복 확인
    const isNicknameDuplicate = await checkNicknameDuplicate(nickname);
    if (isNicknameDuplicate) {
      // setError("nickname", { message: "이미 사용 중인 닉네임입니다." });
      alert('이미 사용 중인 닉네임입니다.')
      setFocus("nickname");
      return;
    }

    clearErrors();

    // 변경 여부 확인 및 알림
    const isNicknameChanged = nickname !== initialNickname;
    const isStatusMessageChanged = statusMessage !== initialStatusMessage;

    if (isNicknameChanged && isStatusMessageChanged) {
      alert("닉네임과 상태 메시지가 모두 변경되었습니다.");
    } else if (isNicknameChanged) {
      alert("닉네임이 변경되었습니다.");
    } else if (isStatusMessageChanged) {
      alert("상태 메시지가 변경되었습니다.");
    } else {
      alert("닉네임과 상태 메시지가 이전과 동일합니다.");
    }
  };

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
      <div className="gap-[68px] sm:flex">
        {/* 프로필 사진 */}
        <div className="flex flex-col items-center gap-[20px]">
          {/* 이미지 미리보기 */}
          <img
            src={previewImg}
            alt="미리보기"
            className="h-[100px] w-[100px] rounded-full border-[1px] border-[#e1e1e1] object-cover"
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
            className="inline-flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-sm bg-[#e7e7e7] px-3 text-[14px] font-semibold text-[#333]"
          >
            프로필 사진 변경
          </label>
        </div>

        {/* 개인정보변경 */}
        <form
          className="w-full"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="mt-[24px] flex flex-col gap-[24px] sm:mt-[0] sm:w-[320px]">
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
                defaultValue={initialNickname}
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
              <InputErrorMessage message={errors.nickname?.message} />
            </span>

            {/* 상태 메시지 */}
            <span className="relative">
              <p className={settingSubTitleStyle}>상태 메시지</p>
              <input
                type="text"
                className={settingInputStyle}
                placeholder="상태 메시지를 입력하세요."
                defaultValue={initialStatusMessage}
                {...register("statusMessage", {
                  maxLength: {
                    value: 30,
                    message: "상태 메시지는 최대 30자 까지 작성 가능합니다.",
                  },
                })}
              />
              <InputErrorMessage message={errors.statusMessage?.message} />
            </span>
          </div>
          <button
            type="submit"
            className={settingButtonStyle}
            disabled={isSubmitting}
          >
            변경사항 저장
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingProfileChange;
