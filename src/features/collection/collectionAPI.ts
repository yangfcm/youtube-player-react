import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../settings/firebaseConfig";
import { Collection, CollectionItem, CollectionItemOperation } from "./types";

const USERS = "users";
const COLLECTIONS = "collections";

// Firestore allows at most 30 values in an `in` filter.
const IN_QUERY_LIMIT = 30;

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

// Firestore rejects `undefined` field values, but CollectionItem's optional
// fields (e.g. channelId/channelTitle on a channel item) come through as
// undefined rather than simply absent.
function stripUndefined<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined),
  ) as T;
}

export async function fetchUserCollectionsAPI(
  userId: string,
): Promise<Collection[]> {
  const userSnap = await getDoc(doc(db, USERS, userId));
  const collectionIds = (userSnap.data()?.collections as string[]) || [];
  if (collectionIds.length === 0) return [];

  const collections: Collection[] = [];
  const snapshots = await Promise.all(
    chunk(collectionIds, IN_QUERY_LIMIT).map((ids) =>
      getDocs(
        query(collection(db, COLLECTIONS), where(documentId(), "in", ids)),
      ),
    ),
  );
  snapshots.forEach((snapshot) =>
    snapshot.forEach((collectionDoc) =>
      collections.push(collectionDoc.data() as Collection),
    ),
  );
  return collections;
}

export async function createCollectionAPI(
  userId: string,
  name: string,
  item: CollectionItem,
): Promise<Collection> {
  const trimmedName = name.trim();

  const newCollectionRef = doc(collection(db, COLLECTIONS));
  const now = Date.now();
  const newCollection: Collection = {
    id: newCollectionRef.id,
    name: trimmedName,
    thumbnail: item.imageUrl || "",
    createdAt: now,
    updatedAt: now,
    totalCount: 1,
    items: [stripUndefined(item)],
  };

  const batch = writeBatch(db);
  batch.set(newCollectionRef, newCollection);
  batch.set(
    doc(db, USERS, userId),
    { collections: arrayUnion(newCollectionRef.id) },
    { merge: true },
  );
  await batch.commit();

  return newCollection;
}

export async function updateCollectionItemAPI(
  collectionId: string,
  item: CollectionItem,
  operation: CollectionItemOperation,
): Promise<Collection> {
  const collectionRef = doc(db, COLLECTIONS, collectionId);
  const collectionSnap = await getDoc(collectionRef);
  const existing = collectionSnap.data() as Collection;

  const updatedItems =
    operation === "add"
      ? [...existing.items, stripUndefined(item)]
      : existing.items.filter(
          (existingItem) =>
            !(
              existingItem.type === item.type &&
              existingItem.itemId === item.itemId
            ),
        );

  const updatedCollection: Collection = {
    ...existing,
    items: updatedItems,
    totalCount: updatedItems.length,
    updatedAt: Date.now(),
  };

  await updateDoc(collectionRef, {
    items: updatedCollection.items,
    totalCount: updatedCollection.totalCount,
    updatedAt: updatedCollection.updatedAt,
  });

  return updatedCollection;
}

export async function updateUserCollectionAPI(
  collectionId: string,
  data: Pick<Collection, "name">,
): Promise<Collection> {
  const collectionRef = doc(db, COLLECTIONS, collectionId);
  const collectionSnap = await getDoc(collectionRef);
  const existing = collectionSnap.data() as Collection;

  const updatedCollection: Collection = {
    ...existing,
    name: data.name.trim(),
    updatedAt: Date.now(),
  };

  await updateDoc(collectionRef, {
    name: updatedCollection.name,
    updatedAt: updatedCollection.updatedAt,
  });

  return updatedCollection;
}

export async function deleteUserCollectionAPI(
  userId: string,
  collectionId: string,
): Promise<string> {
  const batch = writeBatch(db);
  batch.delete(doc(db, COLLECTIONS, collectionId));
  batch.set(
    doc(db, USERS, userId),
    { collections: arrayRemove(collectionId) },
    { merge: true },
  );
  await batch.commit();
  return collectionId;
}
