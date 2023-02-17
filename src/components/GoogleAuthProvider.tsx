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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { signin, signout } = useAuth();

  useEffect(() => {
    const initClient = async () => {
      const googleAuth = await gapi?.auth2.getAuthInstance();
      if (!googleAuth) {
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
            signout();
            return;
          });
      }
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
  }, [signin, signout]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <ErrorMessage open={!!error}>{error}</ErrorMessage>
      {children}
    </>
  );
}
