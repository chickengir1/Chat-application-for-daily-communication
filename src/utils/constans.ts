export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_APP_BASE_URL,
  AUTH: {
    GOOGLE: import.meta.env.VITE_NAVER_AUTH_URL,
  },
} as const;
