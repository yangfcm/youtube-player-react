export type CollectionItemType = "video" | "playlist" | "channel";

export interface CollectionItem {
  type: CollectionItemType;
  id: string;
  title: string;
  imageUrl?: string;
  channelId?: string;
  channelTitle?: string;
}
