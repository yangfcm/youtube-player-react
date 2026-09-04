import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../settings/firebaseConfig";
import { Channel } from "./types";

const USERS = "users";
const CHANNELS = "channels";

// Firestore allows at most 30 values in an `in` filter.
const IN_QUERY_LIMIT = 30;

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

async function fetchSubscribedChannelIds(userId: string): Promise<string[]> {
  const userSnap = await getDoc(doc(db, USERS, userId));
  return (userSnap.data()?.subscriptions as string[] | undefined) || [];
}

export async function fetchSubscribedChannelsAPI(
  userId: string
): Promise<Channel[]> {
  const channelIds = await fetchSubscribedChannelIds(userId);
  if (channelIds.length === 0) return [];

  const channelsById: Record<string, Channel> = {};
  const snapshots = await Promise.all(
    chunk(channelIds, IN_QUERY_LIMIT).map((ids) =>
      getDocs(
        query(collection(db, CHANNELS), where(documentId(), "in", ids))
      )
    )
  );
  snapshots.forEach((snapshot) =>
    snapshot.forEach((channelDoc) => {
      const data = channelDoc.data();
      channelsById[channelDoc.id] = {
        id: channelDoc.id,
        title: data.title || "",
        thumbnail: data.thumbnail || "",
      };
    })
  );

  // Keep the order of users.subscriptions, skipping ids missing from `channels`.
  return channelIds
    .map((id) => channelsById[id])
    .filter((channel): channel is Channel => !!channel);
}

export async function subscribeChannelAPI(
  userId: string,
  channel: Channel
): Promise<void> {
  const channelRef = doc(db, CHANNELS, channel.id);
  // `channels` is shared across all users, keyed by channelId. If another user
  // has already subscribed to this channel the record exists, so only the
  // current user's subscriptions need updating.
  const channelSnap = await getDoc(channelRef);

  const batch = writeBatch(db);
  if (!channelSnap.exists()) {
    batch.set(channelRef, { ...channel, updatedAt: Date.now() });
  }
  batch.set(
    doc(db, USERS, userId),
    { subscriptions: arrayUnion(channel.id) },
    { merge: true }
  );
  await batch.commit();
}

export async function unsubscribeChannelAPI(
  userId: string,
  channelId: string
): Promise<void> {
  // The `channels` document is left in place - other users may still subscribe to it.
  await setDoc(
    doc(db, USERS, userId),
    { subscriptions: arrayRemove(channelId) },
    { merge: true }
  );
}
