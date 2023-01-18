import { useEffect } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { gapi } from "gapi-script";

export function Home() {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: "openid ",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(
      "success:",
      (response as GoogleLoginResponse).getAuthResponse()
    );
  };
  const onFailure = (err: any) => {
    console.log("failed:", err);
  };

  return (
    <>
      Home page{" "}
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID || ""}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </>
  );
}
