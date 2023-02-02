import { Thumbnail } from "../video/types";

export interface Snippet {
  channelId: string;
  channelTitle: string;
  description: string;
  publishedAt: Date;
  title: string;
  thumbnails: {
    default?: Thumbnail;
    high?: Thumbnail;
    maxres?: Thumbnail;
    medium?: Thumbnail;
    standard?: Thumbnail;
  };
}

export interface PlayListId {
  kind: string;
  playlistId: string;
}

export interface Meta {
  id: string | PlayListId;
  etag: string;
  kind: string;
}

export interface PlayListSnippet extends Meta {
  snippet: Snippet;
}

export interface PlayListDetails extends Meta {
  snippet: Snippet;
  contentDetails: {
    itemCount: number;
  };
  status: {
    privacyStatus: string;
  };
}

export interface PlayListsResponse {
  etag: string;
  kind: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: PlayListDetails[];
  nextPageToken?: string;
}

interface PlayListItemDetails extends Meta {
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    playlistId: string;
    position: number;
    publishedAt: Date;
    resourceId: {
      kind: string;
      videoId: string;
    };
    thumbnails: {
      default?: Thumbnail;
      high?: Thumbnail;
      maxres?: Thumbnail;
      medium?: Thumbnail;
      standard?: Thumbnail;
    };
    title: string;
    videoOwnerChannelId: string;
    videoOwnerChannelTitle: string;
  };
  contentDetails: {
    videoId: string;
    videoPublishedAt: Date;
  };
  status: {
    privacyStatus: string;
  };
}

export interface PlayListItemsResponse {
  etag: string;
  kind: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  nextPageToken?: string;
  items: PlayListItemDetails[];
}
