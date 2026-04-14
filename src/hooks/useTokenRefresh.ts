import { useEffect, useRef, useCallback } from "react";
import { useAuth } from "../features/user/useAuth";

// Extend window type for Google APIs
declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: any) => any;
        };
      };
    };
  }
}

/**
 * Hook that manages automatic token renewal
 * Refreshes tokens before they expire to maintain session
 */
export function useTokenRefresh() {
  const { isSignedIn, setToken, signout } = useAuth();
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clientRef = useRef<any>(null);
  const refreshTokenRef = useRef<() => void>(() => {});
  const scheduleTokenRefreshRef = useRef<(expiresAt: number) => void>(() => {});

  // Get the Google client instance
  const getGoogleClient = useCallback(() => {
    if (!window.google?.accounts?.oauth2) {
      return null;
    }

    if (!clientRef.current) {
      clientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope:
          "openid email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl",
        callback: (response: any) => {
          const newExpiresAt = Date.now() + response.expires_in * 1000;
          setToken(response.access_token, newExpiresAt);
          scheduleTokenRefreshRef.current(newExpiresAt);
        },
      });
    }

    return clientRef.current;
  }, [setToken]);

  // Schedule the next token refresh
  const scheduleTokenRefresh = useCallback((expiresAt: number) => {
    // Clear any existing timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    // Calculate when to refresh (5 minutes before expiry)
    const refreshTime = expiresAt - Date.now() - 5 * 60 * 1000; // 5 minutes before expiry

    if (refreshTime > 0) {
      refreshTimeoutRef.current = setTimeout(() => {
        refreshTokenRef.current();
      }, refreshTime);

      console.log(
        `Token refresh scheduled in ${Math.round(refreshTime / 1000)} seconds`,
      );
    }
  }, []);

  // Refresh the token
  const refreshToken = useCallback(async () => {
    try {
      const client = getGoogleClient();
      if (!client) {
        console.warn("Google client not available for token refresh");
        signout();
        return;
      }

      console.log("Refreshing access token...");

      // Request a new access token
      client.requestAccessToken();
    } catch (error) {
      console.error("Failed to refresh token:", error);
      signout();
    }
  }, [getGoogleClient, signout]);

  // Keep refs pointing at the latest function instances
  useEffect(() => {
    scheduleTokenRefreshRef.current = scheduleTokenRefresh;
  }, [scheduleTokenRefresh]);

  useEffect(() => {
    refreshTokenRef.current = refreshToken;
  }, [refreshToken]);

  // Initialize token refresh scheduling when user signs in
  useEffect(() => {
    if (isSignedIn) {
      const expiresAt = Number(localStorage.getItem("expiresAt"));
      if (expiresAt && !isNaN(expiresAt)) {
        scheduleTokenRefresh(expiresAt);
      }
    } else {
      // Clear refresh timeout when user signs out
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [isSignedIn, scheduleTokenRefresh]);

  return {
    refreshToken,
  };
}
