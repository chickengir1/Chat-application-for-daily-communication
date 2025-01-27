import ToggleSwitch from "@/components/common/ToggleSwitch";
import { useEffect, useState } from "react";
import SettingPasswordChange from "@/components/feature/setting/SettingPasswordChange";
import SettingProfileChange from "@/components/feature/setting/SettingProfileChange";
import Button from "@/components/common/Button";
import { useMe } from "@/hooks/api/useMe";
import { userStore } from "@/stores/userStore";

const SettingPage = () => {
  // 스위치 상태
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);

  const { getProfile, changeProfilePicture } = useMe();
  const { profile } = userStore();

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.wrapper}>
        {/* 프로필 변경 */}
        <SettingProfileChange
          email={profile.email}
          profileImg={profile.profileImg}
          nickname={profile.nickname}
          onChangeProfilePicture={changeProfilePicture}
        />

        {/* 비밀번호 변경 */}
        <SettingPasswordChange />

        {/* 알림 설정 */}
        <div className={styles.notificationSection}>
          <h2 className={styles.sectionTitle}>알림 설정</h2>
          <div className={styles.toggleGroup}>
            <div className={styles.toggleRow}>
              <dl>
                <dt className={styles.toggleLabel}>푸시알림</dt>
                <dd className={styles.toggleDescription}>
                  새 메세지에 대한 알림을 받습니다.
                </dd>
              </dl>
              <ToggleSwitch
                connection="push"
                checked={isPushEnabled}
                onChange={(e) => setIsPushEnabled(e.target.checked)}
              />
            </div>
            <div className={styles.toggleRow}>
              <dl>
                <dt className={styles.toggleLabel}>이메일 알림</dt>
                <dd className={styles.toggleDescription}>
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

        {/* 회원탈퇴 */}
        <div className={styles.deletionSection}>
          <h2 className={styles.sectionTitle}>회원탈퇴</h2>
          <div className={styles.deletionRow}>
            <p>탈퇴하시겠습니까?</p>
            <Button text="회원탈퇴" backgroundColor="#ff6161" color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;

const styles = {
  pageContainer:
    "flex h-[calc(100%-72px)] flex-col gap-[20px] p-2 text-white md:h-[100%] md:py-6 md:pl-0 md:pr-6",
  wrapper:
    "h-[100%] w-[100%] overflow-auto rounded-[8px] bg-[#505050] p-[28px]",
  notificationSection: "mt-[40px] border-t border-[#e1e1e1] pt-[50px]",
  sectionTitle: "mb-[28px] text-[18px] font-bold sm:text-[22px]",
  toggleGroup: "flex flex-col gap-[28px]",
  toggleRow: "flex items-center justify-between gap-[16px]",
  toggleLabel: "mb-[4px] font-bold",
  toggleDescription: "text-[14px] text-[#aaa]",
  deletionSection: "mt-[40px] border-t border-[#e1e1e1] pt-[50px]",
  deletionRow: "flex items-center justify-between gap-[16px]",
};
