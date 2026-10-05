import { useEffect, useState, createContext } from "react";
import {
  GoogleAuthProvider as FirebaseGoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../settings/firebaseConfig";
import { useAuth } from "../features/user/useAuth";
import { LoadingSpinner } from "./LoadingSpinner";

export const GoogleAuthContext = createContext<
  { signIn: () => Promise<void>; signOutUser: () => Promise<void> } | undefined
>(undefined);

export function GoogleAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const { syncFirebaseUser, signout } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        syncFirebaseUser(firebaseUser);
      } else {
        signout();
      }
      setLoading(false);
    });
    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, new FirebaseGoogleAuthProvider());
    } catch (error) {
      // Expected when the user closes the popup, or when a new sign-in
      // request cancels one still pending from a previous click.
      const code = (error as { code?: string }).code;
      if (
        code === "auth/cancelled-popup-request" ||
        code === "auth/popup-closed-by-user"
      ) {
        return;
      }
      throw error;
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <GoogleAuthContext.Provider value={{ signIn, signOutUser }}>
      {children}
    </GoogleAuthContext.Provider>
  );
}
