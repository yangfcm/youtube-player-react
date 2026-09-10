import { AsyncStatus } from "../../settings/types";

export type CollectionItemType = "video" | "playlist" | "channel";

export interface CollectionItem {
  type: CollectionItemType;
  itemId: string;
  title: string;
  imageUrl?: string;
  channelId?: string;
  channelTitle?: string;
}

export interface CollectionSnippet {
  id: string;
  name: string;
  thumbnail?: string;
  createdAt: number;
  updatedAt: number;
  totalCount: number;
}

export interface Collection extends CollectionSnippet {
  items: CollectionItem[];
}

interface CollectionData {
  data?: Collection;
  fetchStatus: AsyncStatus;
  fetchError: string;
  mutateStatus: AsyncStatus;
  mutateError: string;
}

export interface CollectionState {
  createStatus: AsyncStatus;
  createError: string; // create collection status and error

  status: AsyncStatus;
  error: string; // list-fetch status and error.

  collections: CollectionSnippet[];

  collectionsData: Map<string, CollectionData>;
}
