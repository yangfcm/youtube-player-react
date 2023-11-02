import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../settings/firebaseConfig";

export const updateUserSubscriptions = async (
  userId: string,
  channelId: string,
  action: "subscribe" | "unsubscribe"
) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  if (!userData) return;

  const currentSubscriptions: string[] = userData.subscriptions;
  let updatedSubscriptions = [...currentSubscriptions];
  if (action === "subscribe") {
    updatedSubscriptions.push(channelId);
  }
  if (action === "unsubscribe") {
    updatedSubscriptions = updatedSubscriptions.filter((c) => c !== channelId);
  }
  await updateDoc(userRef, {
    subscriptions: updatedSubscriptions,
  });
};