import { create } from "zustand";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const authStore = create<AuthState>((set) => ({
  // 개발 환경에서 사용할 엑세스 토큰 생성 방법
  // 1. 포스트맨에서 로그인 요청을 보냅니다.
  // 2. 로그인 요청이 성공하면 응답으로 엑세스 토큰이 반환됩니다.
  // 3. 반환된 엑세스 토큰을 복사하여 아래의 엑세스 토큰 필드에 붙여넣습니다.
  // 4. 프로덕트 레벨에선 절대 쓰면 안됩니다.
  accessToken:
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZXIxMDAwQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM3ODc0Njk2LCJleHAiOjE3Mzc4NzgyOTZ9.WFiI9GettZ1dkDcQZ2yGw7yqz1jFYczMWy21bEau8b7pdW3nDrkbP6Y9alC-iKGirYyKeppMNzOBRQVfyCVJ-Q",
  refreshToken: "",
  setAccessToken: (accessToken) => set(() => ({ accessToken })),
  setRefreshToken: (refreshToken) => set(() => ({ refreshToken })),
}));
