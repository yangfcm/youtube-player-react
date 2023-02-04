import {
  GoogleLogin as ReactGoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useAuth } from "../features/user/useAuth";

export function GoogleLogin() {
  const { signin, signout } = useAuth();

  const handleSuccessSignin = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const auth = (response as GoogleLoginResponse).getAuthResponse();
    const userProfile = (response as GoogleLoginResponse).getBasicProfile();
    signin(
      {
        id: userProfile.getId(),
        firstName: userProfile.getGivenName(),
        lastName: userProfile.getFamilyName(),
        email: userProfile.getEmail(),
        avatar: userProfile.getImageUrl(),
        username: userProfile.getName(),
      },
      auth.access_token
    );
    localStorage.setItem("token", "Bearer " + auth.access_token);
  };

  const handleFailureSignin = () => {
    signout();
    localStorage.removeItem("token");
  };

  return (
    <ReactGoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID || ""}
      buttonText="Log in"
      onSuccess={handleSuccessSignin}
      onFailure={handleFailureSignin}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
      className="auth__google-login-button"
    />
  );
}
