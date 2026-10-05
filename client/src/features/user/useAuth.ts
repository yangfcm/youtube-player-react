import { useCallback } from "react";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import type { User as FirebaseUser } from "firebase/auth";
import { useAppDispatch } from "../../app/hooks";
import {
  signin as signinAction,
  signout as signoutAction,
  setGoogleAuthEnabled as setGoogleAuthEnabledAction,
} from "./userSlice";
import { resetTimeline } from "../timeline/timelineSlice";
import { resetSubscriptions } from "../subscription/subscriptionSlice";
import { resetCollections } from "../collection/collectionSlice";
import { UserProfile } from "./types";
import { RootState } from "../../app/store";
import { db } from "../../settings/firebaseConfig";
import { fetchUserProfileAPI } from "./userAPI";

// Mirrors the profile onto the user's Firestore doc.
async function mirrorProfileToFirestore(profile: UserProfile) {
  await setDoc(
    doc(db, "users", profile.id),
    { ...profile, lastLogin: Date.now() },
    { merge: true },
  );
}

export function useAuth() {
  const dispatch = useAppDispatch();

  const isSignedIn = useSelector(({ user }: RootState) => !!user.profile.data);

  const profile = useSelector((state: RootState) => state.user.profile?.data);
  const isGoogleAuthEnabled = useSelector(
    (state: RootState) => state.user.isGoogleAuthEnabled,
  );

  const setGoogleAuthEnabled = useCallback(
    (enabled: boolean) => {
      dispatch(setGoogleAuthEnabledAction(enabled));
    },
    [dispatch],
  );

  const signout = useCallback(() => {
    localStorage.removeItem("user_email");
    dispatch(resetTimeline());
    dispatch(resetCollections());
    dispatch(resetSubscriptions());
    dispatch(signoutAction());
  }, [dispatch]);

  // Called from GoogleAuthProvider's onAuthStateChanged whenever Firebase
  // reports a signed-in user (initial load, popup sign-in, or token renewal).
  const syncFirebaseUser = useCallback(
    async (firebaseUser: FirebaseUser) => {
      // Keep the Google account's own id (same value as the old GSI `sub`),
      // not Firebase's own uid, so existing Firestore docs still resolve.
      const googleProviderData = firebaseUser.providerData.find(
        (p) => p.providerId === "google.com",
      );
      const id = googleProviderData?.uid ?? firebaseUser.uid;

      const existingProfile = await fetchUserProfileAPI(id);
      const newProfile: UserProfile = {
        id,
        email: firebaseUser.email || "",
        username: firebaseUser.displayName || "",
        avatar: firebaseUser.photoURL || "",
        collections: existingProfile?.collections ?? [],
        subscriptions: existingProfile?.subscriptions ?? [],
      };

      localStorage.setItem("user_email", newProfile.email);
      dispatch(signinAction({ user: newProfile }));
      await mirrorProfileToFirestore(newProfile);
    },
    [dispatch],
  );

  return {
    isSignedIn,
    profile,
    isGoogleAuthEnabled,
    signout,
    setGoogleAuthEnabled,
    syncFirebaseUser,
  };
}
