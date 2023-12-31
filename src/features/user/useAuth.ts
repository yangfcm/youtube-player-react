import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  signin as signinAction,
  signout as signoutAction,
  setGoogleAuthEnabled as setGoogleAuthEnabledAction,
  setToken as setTokenAction,
  fetchUserByToken as fetchUserByTokenAction,
} from "./userSlice";
import { resetTimeline } from "../timeline/timelineSlice";
import { UserProfile } from "./types";
import { RootState } from "../../app/store";

export function useAuth() {
  const dispatch = useAppDispatch();

  const isSignedIn = useSelector(({ user }: RootState) => {
    const isExpired = Date.now() > user.expiresAt;
    return !!user.token && !isExpired;
  });

  const token = useSelector((state: RootState) => state.user.token);
  const isGoogleAuthEnabled = useSelector(
    (state: RootState) => state.user.isGoogleAuthEnabled
  );

  const setGoogleAuthEnabled = useCallback(
    (enabled: boolean) => {
      dispatch(setGoogleAuthEnabledAction(enabled));
    },
    [dispatch]
  );

  const signin = useCallback(
    (user: UserProfile, token: string, expiresAt: number) => {
      localStorage.setItem("token", "Bearer " + token);
      dispatch(signinAction({ user, token, expiresAt }));
    },
    [dispatch]
  );
  const signout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(resetTimeline());
    dispatch(signoutAction());
  }, [dispatch]);

  const setToken = useCallback(
    (token: string, expiresAt: number) => {
      localStorage.setItem("token", "Bearer " + token);
      localStorage.setItem("expiresAt", expiresAt.toString());
      dispatch(setTokenAction({ token, expiresAt }));
    },
    [dispatch]
  );

  const fetchUserByToken = useCallback(
    (token: string) => {
      dispatch(fetchUserByTokenAction(token));
    },
    [dispatch]
  );

  return {
    isSignedIn,
    token,
    isGoogleAuthEnabled,
    signin,
    signout,
    setGoogleAuthEnabled,
    setToken,
    fetchUserByToken,
  };
}
