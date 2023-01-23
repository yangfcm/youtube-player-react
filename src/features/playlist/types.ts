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

export interface Meta {
  id: {
    kind: string;
    playlistId: string;
  };
  etag: string;
  kind: string;
}

export interface PlayListSnippet extends Meta {
  snippet: Snippet;
}
