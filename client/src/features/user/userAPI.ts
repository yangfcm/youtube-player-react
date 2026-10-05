import { doc, getDoc } from "firebase/firestore";
import { UserProfile } from "./types";
import { db } from "../../settings/firebaseConfig";

export async function fetchUserProfileAPI(
  userId: string,
): Promise<UserProfile | undefined> {
  const userSnap = await getDoc(doc(db, "users", userId));
  return userSnap.data() as UserProfile | undefined;
}
