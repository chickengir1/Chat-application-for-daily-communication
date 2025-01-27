import { PropsWithChildren, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/api/useAuth";
import { useNavigation } from "@/hooks/common/useNavigation";

type AuthProviderProps = PropsWithChildren;

// 로그인을 해야하는 경로
const PROTECTED_ROUTES = [
  "/",
  "/chat",
  "/notifications",
  "/settings",
  "/changepassword",
];

// 로그인을 하지 않아도 되는 경로
const UNPROTECTED_ROUTES = ["/login", "/signup", "/findpassword"];

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isSignedIn } = useAuth();
  const { handleNavigation } = useNavigation();

  const checkAuthentication = useCallback(() => {
    const path = location.pathname.toLowerCase();
    if (PROTECTED_ROUTES.includes(path) && !UNPROTECTED_ROUTES.includes(path)) {
      if (!isSignedIn) {
        handleNavigation(0, "/login");
        return;
      }
    }
  }, [isSignedIn, handleNavigation]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return <>{children}</>;
}
