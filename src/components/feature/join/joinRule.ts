// 이메일
export const emailPlaceholder = "이메일을 입력하세요.";
export const emailRequiredMsg = "이메일은 필수 입력 사항입니다.";
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const emailRegexErrorMsg = "유효하지 않은 이메일 형식입니다.";

// 닉네임
export const nicknamePlaceholder = "닉네임을 입력하세요.";
export const nicknameRequiredMsg = "닉네임은 필수 입력 사항입니다.";
export const nicknameMinLengthValue = 2;
export const nicknameMinLengthMsg = `닉네임은 최소 ${nicknameMinLengthValue}자리 이상이어야 합니다.`;
export const nicknameMaxLengthValue = 8;
export const nicknameMaxLengthMsg = `닉네임은 최대 ${nicknameMaxLengthValue}자리 이하이어야 합니다.`;
export const nicknameRegex = /^[a-zA-Z가-힣]{2,8}$/;
export const nicknameRegexErrorMsg = "유효하지 않은 닉네임 형식입니다.";

// 비밀번호
export const passwordPlaceholder = "비밀번호를 입력하세요.";
export const passwordRequiredMsg = "비밀번호는 필수 입력 사항입니다.";
export const passwordMinLengthValue = 8;
export const passwordMinLengthMsg = `비밀번호는 최소 ${passwordMinLengthValue}자리 이상이어야 합니다.`;
export const passwordMaxLengthValue = 16;
export const passwordMaxLengthMsg = `비밀번호는 최대 ${passwordMaxLengthValue}자리 이하이어야 합니다.`;
export const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
export const passwordRegexErrorMsg =
  "비밀번호는 특수문자(!,@,#,$,%,^,&,*) 1개 이상 포함해야 합니다.";

// 비밀번호 확인
export const passwordConfirmationPlaceholder = "비밀번호 확인을 입력하세요.";
export const passwordConfirmationRequiredMsg =
  "비밀번호 확인은 필수 입력 사항입니다.";

export const certificationPlaceholder = "인증번호 6자리를 입력하세요.";
export const certificationRequireMsg = "인증번호는 필수 입력 사항입니다.";
export const certificationMinLengthValue = 6;
export const certificationMinLengthMsg = `인증번호는 ${certificationMinLengthValue}자리 입니다.`;
