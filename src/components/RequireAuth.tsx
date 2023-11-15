import { GoogleLoginNew } from "./GoogleLoginNew";
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
    return showLoginButton ? <GoogleLoginNew /> : null;
  }

  return <>{children}</>;
}
