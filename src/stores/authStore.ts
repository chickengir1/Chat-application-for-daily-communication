import { create } from "zustand";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const authStore = create<AuthState>((set) => ({
  // dev 용 엑세스 토큰
  // eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZXIxMDAwQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM3ODc0Njk2LCJleHAiOjE3Mzc4NzgyOTZ9.WFiI9GettZ1dkDcQZ2yGw7yqz1jFYczMWy21bEau8b7pdW3nDrkbP6Y9alC-iKGirYyKeppMNzOBRQVfyCVJ-Q
  accessToken:
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZXIxMDAwQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM3ODc0Njk2LCJleHAiOjE3Mzc4NzgyOTZ9.WFiI9GettZ1dkDcQZ2yGw7yqz1jFYczMWy21bEau8b7pdW3nDrkbP6Y9alC-iKGirYyKeppMNzOBRQVfyCVJ-Q",
  refreshToken: "",
  setAccessToken: (accessToken) => set(() => ({ accessToken })),
  setRefreshToken: (refreshToken) => set(() => ({ refreshToken })),
}));
