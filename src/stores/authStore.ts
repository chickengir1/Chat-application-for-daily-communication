import { create } from "zustand";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const authStore = create<AuthState>((set) => ({
  accessToken: "",
  refreshToken: "",
  setAccessToken: (accessToken) => set(() => ({ accessToken })),
  setRefreshToken: (refreshToken) => set(() => ({ refreshToken })),
}));
