import { useEffect, useState, useCallback, createContext } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../features/user/useAuth";
import { LoadingSpinner } from "./LoadingSpinner";
import { useProfile } from "../features/user/useProfile";
import { db } from "../settings/firebaseConfig";

export type GsiResponse = {
  client_id: string;
  clientId: string;
  credential: string;
};

export type GsiAuthResponse = {
  access_token: string;
  authuser: string;
  expires_in: number;
  prompt: string;
  scope: string;
  token_type: string;
};

export const GoogleAuthContext = createContext<{ client: any } | undefined>(
  undefined
);

export function GoogleAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gsiLoaded, setGsiLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<any>();
  const { token, setToken, fetchUserByToken, signout } = useAuth();
  const profile = useProfile();

  const initializeGsi = useCallback(() => {
    const { google } = window as any;
    const client = google.accounts.oauth2.initTokenClient({
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope:
        "openid email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl",
      callback: (res: GsiAuthResponse) => {
        setToken(res.access_token, Date.now() + res.expires_in * 1000);
        fetchUserByToken(res.access_token);
      },
    });
    setClient(client);
    setGsiLoaded(true);
  }, [setToken, fetchUserByToken]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = initializeGsi;
    script.async = true;
    script.id = "google-client-script";
    document.querySelector("body")?.appendChild(script);
  }, [initializeGsi]);

  useEffect(() => {
    if (gsiLoaded) {
      const token = localStorage.getItem("token")?.replace("Bearer ", "") || "";
      const expiresAt = Number(localStorage.getItem("expiresAt"));
      if (!token || isNaN(expiresAt) || Date.now() > expiresAt) {
        signout();
        setLoading(false);
        return;
      }
      setToken(token, expiresAt);
      fetchUserByToken(token);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [gsiLoaded]);

  useEffect(() => {
    if (profile && token) {
      setDoc(
        doc(db, "users", profile.id),
        {
          ...profile,
          accessToken: token.replace("Bearer ", ""),
          lastLogin: Date.now(),
        },
        { merge: true }
      );
    }
  }, [profile, token]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <GoogleAuthContext.Provider value={{ client }}>
        {children}
      </GoogleAuthContext.Provider>
    </>
  );
}
