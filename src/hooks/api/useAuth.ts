import { authStore } from "@/stores/authStore";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const { accessToken } = authStore((state) => state);
  const [isSignedIn, setIsSignedIn] = useState(Boolean(accessToken));

  useEffect(() => {
    setIsSignedIn(Boolean(accessToken));
  }, [accessToken]);

  return { isSignedIn };
};
