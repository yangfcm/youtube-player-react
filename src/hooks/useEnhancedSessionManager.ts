/**
 * Enhanced session management with multiple strategies
 */

import { useEffect, useCallback, useRef } from "react";
import { useAuth } from "../features/user/useAuth";

export function useEnhancedSessionManager() {
  const { isSignedIn, setToken } = useAuth();
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const visibilityChangeRef = useRef<() => void>();

  /**
   * Request a new token using Google's silent refresh
   */
  const requestTokenRefresh = useCallback(async () => {
    try {
      if (!window.google?.accounts?.oauth2) {
        console.warn("Google OAuth not available for refresh");
        return;
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope:
          "openid email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl",
        hint: localStorage.getItem("user_email") || "", // Use stored email as hint
        callback: (response: any) => {
          const newExpiresAt = Date.now() + response.expires_in * 1000;
          setToken(response.access_token, newExpiresAt);
          console.log("Token refreshed successfully");
        },
      });

      // Request token silently
      client.requestAccessToken();
    } catch (error) {
      console.error("Failed to refresh token:", error);
      // Don't automatically sign out on refresh failure
      // Let the user continue until they make an authenticated request
    }
  }, [setToken]);

  /**
   * Strategy 1: Periodic token check and refresh
   */
  const startPeriodicRefresh = useCallback(() => {
    // Check token validity every 10 minutes
    refreshIntervalRef.current = setInterval(
      async () => {
        if (!isSignedIn) return;

        const expiresAt = Number(localStorage.getItem("expiresAt"));
        const now = Date.now();
        const timeUntilExpiry = expiresAt - now;

        // If token expires in less than 15 minutes, try to refresh
        if (timeUntilExpiry < 15 * 60 * 1000) {
          await requestTokenRefresh();
        }
      },
      10 * 60 * 1000,
    ); // Check every 10 minutes
  }, [isSignedIn, requestTokenRefresh]);

  /**
   * Strategy 2: Refresh on window focus/visibility change
   */
  const setupVisibilityRefresh = useCallback(() => {
    visibilityChangeRef.current = async () => {
      if (document.visibilityState === "visible" && isSignedIn) {
        const expiresAt = Number(localStorage.getItem("expiresAt"));
        const now = Date.now();

        // If token is expired or expires soon, refresh it
        if (now >= expiresAt || expiresAt - now < 5 * 60 * 1000) {
          await requestTokenRefresh();
        }
      }
    };

    document.addEventListener("visibilitychange", visibilityChangeRef.current);
  }, [isSignedIn, requestTokenRefresh]);

  /**
   * Strategy 3: Activity-based session extension
   */
  const extendSessionOnActivity = useCallback(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];
    let activityTimeout: NodeJS.Timeout;

    const handleActivity = () => {
      clearTimeout(activityTimeout);

      // Check if we should refresh token due to user activity
      activityTimeout = setTimeout(
        async () => {
          if (isSignedIn) {
            const expiresAt = Number(localStorage.getItem("expiresAt"));
            const timeUntilExpiry = expiresAt - Date.now();

            // If token expires in less than 20 minutes and user is active, refresh
            if (timeUntilExpiry < 20 * 60 * 1000) {
              await requestTokenRefresh();
            }
          }
        },
        2 * 60 * 1000,
      ); // Wait 2 minutes after activity stops
    };

    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    // Cleanup function
    return () => {
      clearTimeout(activityTimeout);
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [isSignedIn, requestTokenRefresh]);

  /**
   * Initialize all session management strategies
   */
  useEffect(() => {
    if (isSignedIn) {
      startPeriodicRefresh();
      setupVisibilityRefresh();
      const cleanupActivity = extendSessionOnActivity();

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
        if (visibilityChangeRef.current) {
          document.removeEventListener(
            "visibilitychange",
            visibilityChangeRef.current,
          );
        }
        cleanupActivity();
      };
    }
  }, [
    isSignedIn,
    startPeriodicRefresh,
    setupVisibilityRefresh,
    extendSessionOnActivity,
  ]);

  return {
    requestTokenRefresh,
  };
}
