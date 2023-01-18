import { useEffect } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { gapi } from "gapi-script";
import { useAuth } from "../features/user/useAuth";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isSignedIn, signin, signout } = useAuth();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: "openid ",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const handleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const auth = (response as GoogleLoginResponse).getAuthResponse();
    console.log(auth);
    const userProfile = (response as GoogleLoginResponse).getBasicProfile();
    signin({
      id: userProfile.getId(),
      firstName: userProfile.getGivenName(),
      lastName: userProfile.getFamilyName(),
      email: userProfile.getEmail(),
      avatar: userProfile.getImageUrl(),
      username: userProfile.getName(),
    });
  };
  const handleFailure = () => {
    signout();
  };

  if (!isSignedIn) {
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID || ""}
        buttonText="Sign in with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    );
  }

  return <>{children}</>;
}
