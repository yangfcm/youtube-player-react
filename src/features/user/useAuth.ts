import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  selIsSignedIn,
  signin as signinAction,
  signout as signoutAction,
  UserProfile,
} from "./userSlice";

export function useAuth() {
  const dispatch = useAppDispatch();

  const isSignedIn = useSelector(selIsSignedIn);
  const signin = useCallback(
    (user: UserProfile) => {
      dispatch(signinAction(user));
    },
    [dispatch]
  );
  const signout = useCallback(() => {
    dispatch(signoutAction());
  }, [dispatch]);

  return {
    isSignedIn,
    signin,
    signout,
  };
}
