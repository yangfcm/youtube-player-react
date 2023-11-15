import { useEffect, useState, useCallback, useRef } from "react";
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

export function GoogleAuthProviderNew({
  children,
}: {
  children: React.ReactNode;
}) {

  const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false);
  const client = useRef<any>(null);

  const initializeGsi = useCallback(() => {
    const { google } = window as any;
    console.log('initialize gsi', google,);
    if(!google || gsiScriptLoaded) return;
    setGsiScriptLoaded(true);
    client.current = google.accounts.oauth2.initTokenClient({
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/userinfo.profile',
      callback: (res: GsiAuthResponse) => {
        console.log(res);
      }
    })
    
  },[gsiScriptLoaded]);
  
  useEffect(() =>{
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = initializeGsi;
    script.async = true;
    script.id = 'google-client-script';
    document.querySelector('body')?.appendChild(script);
  }, []);

  if(!gsiScriptLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <>{children}</>
  )
}