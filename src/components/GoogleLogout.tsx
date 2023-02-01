import { GoogleLogout as ReactGoogleLogout } from "react-google-login";
import { useAuth } from "../features/user/useAuth";

export function GoogleLogout() {
  const { signout } = useAuth();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    signout();
  };

  return (
    <ReactGoogleLogout
      clientId={process.env.REACT_APP_CLIENT_ID || ""}
      onLogoutSuccess={handleSignOut}
      className="auth__google-logout-button"
      buttonText="Sign Out"
    />
  );
}
