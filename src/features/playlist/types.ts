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

interface PlayListId {
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
