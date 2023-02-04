import { GoogleLogin } from "./GoogleLogin";
import { useAuth } from "../features/user/useAuth";

export function RequireAuth({
  children,
  showLoginButton = true,
}: {
  children: React.ReactNode;
  showLoginButton?: boolean;
}) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return showLoginButton ? <GoogleLogin /> : null;
  }

  return <>{children}</>;
}
