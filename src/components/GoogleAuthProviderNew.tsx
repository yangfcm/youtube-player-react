import { useEffect, useState, useCallback, useRef, createContext } from "react";
import { useAuth } from "../features/user/useAuth";
import { LoadingSpinner } from "./LoadingSpinner";

export type GsiResponse = {
  client_id: string
  clientId: string
  credential: string
}

export type GsiAuthResponse = {
  access_token: string
  authuser: string
  expires_in: number
  prompt: string
  scope: string
  token_type: string
}

export const GoogleAuthContext = createContext<{client: any} | undefined>(undefined);

export function GoogleAuthProviderNew({
  children,
}: {
  children: React.ReactNode;
}) {

  const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false);
  const { setToken, fetchUserByToken } = useAuth();
  const client = useRef<any>(null);

  const initializeGsi = useCallback(() => {
    const { google } = window as any;
    if(!google || gsiScriptLoaded) return;
    setGsiScriptLoaded(true);
    client.current = google.accounts.oauth2.initTokenClient({
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope: 'openid email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl',
      callback: (res: GsiAuthResponse) => {
        setToken(res.access_token, Date.now() + res.expires_in * 1000);
        fetchUserByToken(res.access_token);
      }
    })
  },[gsiScriptLoaded, setToken, fetchUserByToken]);
  
  useEffect(() =>{
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = initializeGsi;
    script.async = true;
    script.id = 'google-client-script';
    document.querySelector('body')?.appendChild(script);
  }, [initializeGsi]);

  if(!gsiScriptLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <GoogleAuthContext.Provider value={{client: client.current}}>{children}</GoogleAuthContext.Provider>
  )
}