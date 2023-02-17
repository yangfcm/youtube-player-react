import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  selIsSignedIn,
  selToken,
  signin as signinAction,
  signout as signoutAction,
  setGoogleAuthEnabled as setGoogleAuthEnabledAction,
} from "./userSlice";
import { UserProfile } from "./types";
import { RootState } from "../../app/store";

export function useAuth() {
  const dispatch = useAppDispatch();

  const isSignedIn = useSelector(selIsSignedIn);
  const token = useSelector(selToken);
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
