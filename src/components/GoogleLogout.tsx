import { GoogleLoginBase } from "./GoogleLoginBase";
import { useAuth } from "../features/user/useAuth";

export function GoogleLogout() {
  const { signout } = useAuth();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    signout();
  };

  return (
    <GoogleLoginBase
      isLoggedIn={true}
      onSuccess={handleSignOut}
      buttonText="Log out"
    />
  );
}
