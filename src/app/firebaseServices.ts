import { doc, getDoc } from "firebase/firestore";
import { db } from "../settings/firebaseConfig";

export const updaterUserSubscriptions = async (
  userId: string,
  channelIds: string[],
  action: "subscribe" | "unsubscribe"
) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  console.log(userSnap);
};
