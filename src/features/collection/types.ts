export type CollectionItemType = "video" | "playlist" | "channel";

export interface CollectionItem {
  type: CollectionItemType;
  itemId: string;
  title: string;
  imageUrl?: string;
  channelId?: string;
  channelTitle?: string;
}

export interface Collection {
  id: string;
  name: string;
  thumbnail?: string;
  createdAt: number;
  updatedAt: number;
  totalCount: number;
  items: CollectionItem[];
}
