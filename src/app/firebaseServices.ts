import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../settings/firebaseConfig";
import { SERVER_URL } from "../settings/constant";
import axios from "axios";

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

export const downloadVideo = async ({
  videoId,
  userId,
  title,
}: {
  videoId: string;
  userId: string;
  title: string;
}) => {
  const response = await axios.post(`${SERVER_URL}/download/`, {
    videoId,
    userId,
    title,
  });
  return response.data;
};

export const fetchVideoInfo = async (videoId: string) => {
  const response = await axios.get(`${SERVER_URL}/videoinfo/${videoId}`);
  return response.data;
};
