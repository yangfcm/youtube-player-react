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
    channelId: string;
  };
  etag: string;
  kind: string;
}

export interface ChannelSnippet extends Meta {
  snippet: Snippet;
}

export interface ChannelDetails {
  id: string;
  etag: string;
  kind: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: Date;
    thumbnails: {
      default?: Thumbnail;
      high?: Thumbnail;
      medium?: Thumbnail;
    };
  };
  statistics: {
    subscriberCount: string;
    videoCount: string;
    viewCount: string;
  };
}

export interface ChannelDetailsResponse {
  etag: string;
  kind: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: ChannelDetails[];
}
