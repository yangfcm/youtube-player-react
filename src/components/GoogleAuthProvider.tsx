import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import { GapiLoadError } from "../settings/types";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";

export function GoogleAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <ErrorMessage open={!!error}>{error}</ErrorMessage>
      {children}
    </>
  );
}
