import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  selIsSignedIn,
  selToken,
  signin as signinAction,
  signout as signoutAction,
  UserProfile,
} from "./userSlice";

export function useAuth() {
  const dispatch = useAppDispatch();

  const isSignedIn = useSelector(selIsSignedIn);
  const token = useSelector(selToken);

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
    signin,
    signout,
  };
}
