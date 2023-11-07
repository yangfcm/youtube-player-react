import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import { GapiLoadError } from "../settings/types";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";
import { useAuth } from "../features/user/useAuth";

export function GoogleAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signin, signout, setGoogleAuthEnabled } = useAuth();

  useEffect(() => {
    const initClient = async () => {
      if(!gapi?.client?.init) {
        return;
      }
      setLoading(true);
      gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: "openid email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl",
        })
        .then(() => {
          setLoading(false);
          setGoogleAuthEnabled(true);
        })
        .catch((e: GapiLoadError) => {
          setLoading(false);
          setError(e.details);
          setGoogleAuthEnabled(false);
          return;
        });
      const googleAuth = await gapi.auth2.getAuthInstance();
      const isSignedIn = googleAuth.isSignedIn.get();
      if (isSignedIn) {
        const currentUser = googleAuth.currentUser.get();
        const authResponse = currentUser.getAuthResponse();
        const userProfile = currentUser.getBasicProfile();
        signin(
          {
            id: userProfile.getId(),
            firstName: userProfile.getGivenName(),
            lastName: userProfile.getFamilyName(),
            email: userProfile.getEmail(),
            avatar: userProfile.getImageUrl(),
            username: userProfile.getName(),
          },
          authResponse.access_token,
          authResponse.expires_at
        );
      } else {
        signout();
      }
      setLoading(false);
      setError("");
    };
    gapi.load("client:auth2", initClient);
  }, [signin, signout, setGoogleAuthEnabled]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <ErrorMessage open={!!error}>{error}</ErrorMessage>
      {children}
    </>
  );
}
