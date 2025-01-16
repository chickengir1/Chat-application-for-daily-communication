import ToggleSwitch from "@/components/common/ToggleSwitch";
import { useState } from "react";
import {
  settingSubTitleStyle,
  settingTitleStyle,
} from "@/components/feature/setting/settingStyle";
import SettingPasswordChange from "@/components/feature/setting/SettingPasswordChange";
import SettingProfileChange from "@/components/feature/setting/SettingProfileChange";

const SettingPage = () => {
  // 스위치 상태
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);

  return (
    <div
      className="flex flex-col gap-[20px] h-[calc(100%-64px)] 
    md:h-[100%] p-2 text-white md:pl-0 md:pr-6 md:py-6"
    >
      <div className="w-[100%] h-[100%] p-[28px] bg-[#505050] rounded-[8px] overflow-auto">
        {/* 프로필 변경 */}
        <SettingProfileChange />

        {/* 비밀번호 변경 */}
        <SettingPasswordChange />

        {/* 알림 설정 */}
        <div className="mt-[40px] border-t border-[#e1e1e1] pt-[50px]">
          <h2 className={settingTitleStyle}>알림 설정</h2>
          <div className="flex flex-col gap-[28px]">
            <div className="flex items-center justify-between gap-[16px]">
              <dl>
                <dt className={settingSubTitleStyle}>푸시알림</dt>
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
                <dt className={settingSubTitleStyle}>이메일 알림</dt>
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
