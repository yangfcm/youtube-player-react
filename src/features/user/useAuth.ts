import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  signin as signinAction,
  signout as signoutAction,
  setGoogleAuthEnabled as setGoogleAuthEnabledAction,
} from "./userSlice";
import { UserProfile } from "./types";
import { RootState } from "../../app/store";

export function useAuth() {
  const dispatch = useAppDispatch();

  const isSignedIn = useSelector(({ user }: RootState) => {
    const isExpired = Date.now() > user.expiresAt;
    return !!(user.profile?.id && user.token && !isExpired);
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
      dispatch(signinAction({ user, token, expiresAt }));
    },
    [dispatch]
  );
  const signout = useCallback(() => {
    dispatch(signoutAction());
  }, [dispatch]);

  return {
    isSignedIn,
    token,
    isGoogleAuthEnabled,
    signin,
    signout,
    setGoogleAuthEnabled,
  };
}
