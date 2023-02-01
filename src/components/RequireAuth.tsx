import { useState, useEffect } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { gapi } from "gapi-script";
import { useAuth } from "../features/user/useAuth";
import { GapiLoadError } from "../settings/types";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isSignedIn, signin, signout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: "openid ",
        })
        .then(() => {
          setLoading(false);
        })
        .catch((e: GapiLoadError) => {
          setLoading(false);
          setError(e.details);
        });
    };
    gapi.load("client:auth2", initClient);
  }, []);

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

  if (loading) return null;
  if (error) return <div>{error}</div>;

  if (!isSignedIn) {
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID || ""}
        buttonText="Sign in with Google"
        onSuccess={handleSuccessSignin}
        onFailure={handleFailureSignin}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        className="auth__google-login-button"
      />
    );
  }

  return <>{children}</>;
}
