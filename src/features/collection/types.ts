export type CollectionItemType = "video" | "playlist" | "channel";

export interface CollectionItem {
  type: CollectionItemType;
  itemId: string;
  title: string;
  imageUrl?: string;
  channelId?: string;
  channelTitle?: string;
}
