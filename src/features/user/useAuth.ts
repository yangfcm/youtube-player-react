import { useCallback } from "react";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { useAppDispatch } from "../../app/hooks";
import {
  signin as signinAction,
  signout as signoutAction,
  setGoogleAuthEnabled as setGoogleAuthEnabledAction,
  setToken as setTokenAction,
  fetchUserByToken as fetchUserByTokenAction,
} from "./userSlice";
import { resetTimeline } from "../timeline/timelineSlice";
import {
  resetSubscriptions,
  fetchSubscribedChannels,
} from "../subscription/subscriptionSlice";
import { UserProfile } from "./types";
import { RootState } from "../../app/store";
import { db } from "../../settings/firebaseConfig";

// Mirrors the profile + current access token onto the user's Firestore doc.
// A backend Cloud Function reads this to make YouTube API calls on the
// user's behalf (e.g. the daily timeline job), so it must stay fresh across
// token refreshes - not just at login.
async function mirrorProfileToFirestore(profile: UserProfile, token: string) {
  localStorage.setItem("user_email", profile.email);
  await setDoc(
    doc(db, "users", profile.id),
    { ...profile, accessToken: token, lastLogin: Date.now() },
    { merge: true }
  );
}

export function useAuth() {
  const dispatch = useAppDispatch();

  const isSignedIn = useSelector(({ user }: RootState) => {
    const isExpired = Date.now() > user.expiresAt;
    return !!user.token && !isExpired;
  });

  const token = useSelector((state: RootState) => state.user.token);
  const profile = useSelector((state: RootState) => state.user.profile?.data);
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
    dispatch(resetSubscriptions());
    dispatch(signoutAction());
  }, [dispatch]);

  const setToken = useCallback(
    (token: string, expiresAt: number) => {
      localStorage.setItem("token", "Bearer " + token);
      localStorage.setItem("expiresAt", expiresAt.toString());
      dispatch(setTokenAction({ token, expiresAt }));
      // Keep the Firestore mirror's accessToken fresh on periodic refreshes
      // too - only login/session-restore needs to sequence against the
      // subscriptions fetch below, since that's the only place they race.
      if (profile) {
        mirrorProfileToFirestore(profile, token);
      }
    },
    [dispatch, profile]
  );

  const fetchUserByToken = useCallback(
    (token: string) => {
      dispatch(fetchUserByTokenAction(token))
        .unwrap()
        .then(async (response) => {
          const { sub, email, name, family_name, given_name, picture } =
            response.data;
          const newProfile: UserProfile = {
            id: sub,
            email,
            username: name,
            lastName: family_name,
            firstName: given_name,
            avatar: picture,
          };
          // Await the mirror write before reading subscriptions so the two
          // Firestore operations on this doc never race each other.
          await mirrorProfileToFirestore(newProfile, token);
          dispatch(fetchSubscribedChannels(sub));
        })
        .catch(() => {});
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
