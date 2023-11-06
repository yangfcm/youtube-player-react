import { Thumbnail } from "../video/types";
import { AsyncStatus } from "../../settings/types";
import { VideosSnippetResponse } from "../video/types";
import { PlayListsResponse } from "../playlist/types";

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
  brandingSettings?: {
    image?: {
      bannerExternalUrl?: string;
    };
  };
  contentDetails: {
    relatedPlaylists: {
      uploads: string;
    };
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

export interface ChannelState {
  profile: {
    status: AsyncStatus;
    error: string;
    data: Record<string, ChannelDetails>;
  };
  videos: {
    status: AsyncStatus;
    error: string;
    data: Record<string, VideosSnippetResponse>;
  };
  playlists: {
    status: AsyncStatus;
    error: string;
    data: Record<string, PlayListsResponse>;
  };
}
