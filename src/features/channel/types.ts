import { Thumbnail } from "../video/types";

export interface Snippet {
  channelId: string;
  channelTitle: string;
  description: string;
  publishedAt: Date;
  title: string;
  thumbnails: Thumbnail[];
}

export interface Meta {
  id: {
    kind: string;
    channelId: string;
  };
  etag: string;
  kind: string;
}

export interface ChannelSnippet extends Meta {
  snippet: Snippet;
}
