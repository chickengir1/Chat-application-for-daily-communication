import { create } from "zustand";

export interface UserProfile {
  id: number;
  nickname: string;
  email: string;
  password: string;
  isFirstLogin: boolean;
  role: string;
  profileImg: string;
  activated: boolean;
  oauthProvider: string | null;
  oauthId: string | null;
  oauthToken: string | null;
  friendshipList: null;
}

interface UserState {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

export const userStore = create<UserState>((set) => ({
  profile: {
    id: 0,
    nickname: "",
    email: "",
    password: "",
    isFirstLogin: false,
    role: "",
    profileImg: "/assets/images/default_profile.svg",
    activated: false,
    oauthProvider: "",
    oauthId: "",
    oauthToken: "",
    friendshipList: null,
  },
  setProfile: (profile: UserProfile) => set(() => ({ profile })),
}));
