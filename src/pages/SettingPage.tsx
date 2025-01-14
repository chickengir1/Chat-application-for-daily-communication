import ToggleSwitch from "@/components/common/ToggleSwitch";
import { useState } from "react";

const SettingPage = () => {
  const defaultImg = "/assets/images/default_profile.svg";
  const [previewImg, setPreviewImg] = useState<string | undefined>(defaultImg);

  // 스위치 상태
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  console.log("isPushEnabled", isPushEnabled);
  console.log("isEmailEnabled", isEmailEnabled);

  // 스타일 변수
  const titleStyle = `mb-[28px] text-[18px] sm:text-[22px] font-bold`;
  const settingBoxStyle = `flex flex-col gap-[16px] w-[100%] sm:max-w-[320px] mt-[16px] sm:mt-[0px]`;
  const subTitleStyle = `mb-[4px] font-bold`;
  const inputStyle = `w-[100%] h-[40px] p-2 text-sm border rounded text-[#333]`;
  const buttonStyle = `block w-[100%] sm:w-[auto] h-10 px-3 mt-[24px] ml-auto text-[14px] font-semibold whitespace-nowrap	rounded-sm bg-[#e7e7e7] text-[#333]`;
  // const errorMessageStyle = `absolute top-[calc(100%+2px)] text-[11px] text-[#E92B2B]`;

  // 파일 업로드 핸들러
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-[100%] py-6 pr-6 text-[#fff]">
      <div className="w-[100%] h-[100%] p-[28px] bg-[#505050] rounded-[8px] overflow-auto">
        {/* 프로필 변경 */}
        <div>
          <h2 className={titleStyle}>프로필 변경</h2>
          <form>
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
                <span>
                  <p className={subTitleStyle}>이름</p>
                  <input type="text" className={inputStyle} />
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
            <button type="submit" className={buttonStyle}>
              변경사항 저장
            </button>
          </form>
        </div>

        {/* 비밀번호 변경 */}
        <div className="mt-[40px] pt-[50px] border-t border-[#e1e1e1]">
          <h2 className={titleStyle}>비밀번호 변경</h2>
          <form>
            <div className={settingBoxStyle}>
              {/* 현재 비밀번호 */}
              <span>
                <p className={subTitleStyle}>현재 비밀번호</p>
                <input type="text" className={inputStyle} />
              </span>

              {/* 새 비밀번호 */}
              <span>
                <p className={subTitleStyle}>새 비밀번호 변경</p>
                <input type="text" className={inputStyle} />
              </span>

              {/* 새 비밀번호 확인 */}
              <span>
                <p className={subTitleStyle}>새 비밀번호 확인</p>
                <input type="text" className={inputStyle} />
              </span>
            </div>
            <button type="submit" className={buttonStyle}>
              변경사항 저장
            </button>
          </form>
        </div>

        {/* 알림 설정 */}
        <div className="mt-[40px] pt-[50px] border-t border-[#e1e1e1]">
          <h2 className={titleStyle}>알림 설정</h2>
          <div className="flex flex-col gap-[28px]">
            <div className="flex items-center justify-between gap-[16px]">
              <dl>
                <dt className={subTitleStyle}>푸시알림</dt>
                <dd className="text-[14px] text-[#aaa]">
                  새 메세지에 대한 알림을 받습니다.
                </dd>
              </dl>
              <ToggleSwitch
                connection="push"
                checked={isPushEnabled}
                onChange={(e) => setIsPushEnabled(e.target.checked)}
              />
            </div>
            <div className="flex items-center justify-between gap-[16px]">
              <dl>
                <dt className={subTitleStyle}>이메일 알림</dt>
                <dd className="text-[14px] text-[#aaa]">
                  중요한 업데이트에 대한 이메일을 받습니다.
                </dd>
              </dl>
              <ToggleSwitch
                connection="email"
                checked={isEmailEnabled}
                onChange={(e) => setIsEmailEnabled(e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
