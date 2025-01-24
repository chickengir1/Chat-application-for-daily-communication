import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "@/hooks/api/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

type AuthProviderProps = PropsWithChildren;

// 로그인을 해야하는 경로
const PROTECTED_ROUTES = [
  "/chat",
  "/notifications",
  "/settings",
  "/changepassword",
];

// 로그인을 하지 않아도 되는 경로
const UNPROTECTED_ROUTES = ["/login", "/signup", "/findpassword"];

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isSignedIn } = useAuth();
  // debugger;
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  useEffect(() => {
    if (PROTECTED_ROUTES.includes(path) && !UNPROTECTED_ROUTES.includes(path)) {
      if (!isSignedIn) {
        navigate("/login", { replace: true });
        return;
      }
    }
  }, [location]);

  return <>{children}</>;
}
