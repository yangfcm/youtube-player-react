import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  documentId,
  getDoc,
  getDocFromServer,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../settings/firebaseConfig";
import { SavedPlaylist } from "./types";

const USERS = "users";
const PLAYLISTS = "playlists";

// Firestore allows at most 30 values in an `in` filter.
const IN_QUERY_LIMIT = 30;

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

async function fetchSavedPlaylistIds(userId: string): Promise<string[]> {
  // This doc is also written to on login (see useAuth's profile mirror),
  // so force a genuine server round trip rather than risk a stale local view.
  const userSnap = await getDocFromServer(doc(db, USERS, userId));
  return (userSnap.data()?.playlists as string[] | undefined) || [];
}

export async function fetchSavedPlaylistsAPI(
  userId: string
): Promise<SavedPlaylist[]> {
  const playlistIds = await fetchSavedPlaylistIds(userId);
  if (playlistIds.length === 0) return [];

  const playlistsById: Record<string, SavedPlaylist> = {};
  const snapshots = await Promise.all(
    chunk(playlistIds, IN_QUERY_LIMIT).map((ids) =>
      getDocs(
        query(collection(db, PLAYLISTS), where(documentId(), "in", ids))
      )
    )
  );
  snapshots.forEach((snapshot) =>
    snapshot.forEach((playlistDoc) => {
      const data = playlistDoc.data();
      playlistsById[playlistDoc.id] = {
        id: playlistDoc.id,
        title: data.title || "",
        thumbnail: data.thumbnail || "",
        channelId: data.channelId || "",
        channelTitle: data.channelTitle || "",
        itemCount: data.itemCount,
      };
    })
  );

  // Keep the order of users.playlists, skipping ids missing from `playlists`.
  return playlistIds
    .map((id) => playlistsById[id])
    .filter((playlist): playlist is SavedPlaylist => !!playlist);
}

export async function savePlaylistAPI(
  userId: string,
  playlist: SavedPlaylist
): Promise<void> {
  const playlistRef = doc(db, PLAYLISTS, playlist.id);
  // `playlists` is shared across all users, keyed by playlistId. Unlike
  // channels, playlist metadata (title/thumbnail/itemCount, etc.) can drift
  // over time, so an existing doc is updated in place when any field changed.
  const playlistSnap = await getDoc(playlistRef);

  const batch = writeBatch(db);
  if (!playlistSnap.exists()) {
    // Firestore rejects explicit `undefined` field values, and search-sourced
    // playlists don't have an itemCount (search.list has no contentDetails),
    // so it's only included when actually known.
    const { id, title, thumbnail, channelId, channelTitle, itemCount } =
      playlist;
    batch.set(playlistRef, {
      id,
      title,
      thumbnail,
      channelId,
      channelTitle,
      ...(itemCount !== undefined ? { itemCount } : {}),
      updatedAt: Date.now(),
    });
  } else {
    const data = playlistSnap.data();
    const changes: Partial<SavedPlaylist> = {};
    if (data.title !== playlist.title) changes.title = playlist.title;
    if (data.thumbnail !== playlist.thumbnail)
      changes.thumbnail = playlist.thumbnail;
    if (data.channelTitle !== playlist.channelTitle)
      changes.channelTitle = playlist.channelTitle;
    if (
      playlist.itemCount !== undefined &&
      data.itemCount !== playlist.itemCount
    )
      changes.itemCount = playlist.itemCount;
    if (Object.keys(changes).length > 0) {
      batch.update(playlistRef, { ...changes, updatedAt: Date.now() });
    }
  }
  batch.set(
    doc(db, USERS, userId),
    { playlists: arrayUnion(playlist.id) },
    { merge: true }
  );
  await batch.commit();
}

export async function removePlaylistAPI(
  userId: string,
  playlistId: string
): Promise<void> {
  // The `playlists` document is left in place - other users may still have it saved.
  await setDoc(
    doc(db, USERS, userId),
    { playlists: arrayRemove(playlistId) },
    { merge: true }
  );
}
