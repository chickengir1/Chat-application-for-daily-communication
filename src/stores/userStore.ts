import { create } from "zustand";

interface UserProfile {
  id: number;
  nickname: string;
  email: string;
  password: string;
  isFirstLogin: boolean;
  role: string;
  profileImg: string;
  activated: boolean;
  oauthProvider: string;
  oauthId: string;
  oauthToken: string;
}

interface UserState {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

export const userStore = create<UserState>((set) => ({
  profile: {
    id: 0,
    nickname: "test",
    email: "test@test.com",
    password: "",
    isFirstLogin: false,
    role: "",
    profileImg: "/assets/images/default_profile.svg",
    activated: false,
    oauthProvider: "",
    oauthId: "",
    oauthToken: "",
  },
  setProfile: (profile: UserProfile) => set(() => ({ profile })),
}));
