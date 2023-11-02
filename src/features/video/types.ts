import { AsyncStatus } from "../../settings/types";

export interface Thumbnail {
  height?: number;
  width?: number;
  url: string;
}

export interface Snippet {
  title: string;
  description: string;
  categoryId: string;
  channelId: string;
  channelTitle: string;
  publishedAt: Date;
  tags: string[];
  thumbnails: {
    default?: Thumbnail;
    high?: Thumbnail;
    maxres?: Thumbnail;
    medium?: Thumbnail;
    standard?: Thumbnail;
  };
}

export interface Statistics {
  commentCount: string;
  favoriteCount: string;
  likeCount: string;
  viewCount: string; // These properties are all number represented by string.
}

export type VideoId = { videoId: string; kind: string };

export interface Meta {
  id: string | VideoId;
  etag: string;
  kind: string;
}

export interface VideoSnippet extends Meta {
  snippet: Snippet;
}

export interface VideoSnippetStats extends Meta {
  snippet: Snippet;
  statistics: Statistics;
}

export interface VideoResponse {
  etag: string;
  kind: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  items: VideoSnippetStats[];
}

export interface VideosResponse {
  etag: string;
  kind: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  items: VideoSnippetStats[];
  nextPageToken?: string;
  prevPageToken?: string;
}

export interface VideosSnippetResponse {
  etag: string;
  kind: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  items: VideoSnippet[];
  nextPageToken?: string;
  prevPageToken?: string;
}

export interface RelatedVideo {
  videoId: string;
  title: string;
  publishedAt: string;
  lengthSeconds?: number;
  viewCount?: string;
  shortViewCountText?: string;
  thumbnail: string;
  channelId: string;
  channelTitle: string;
  channelThumbnail?: string;
}

export interface VideoInfoResponse {
  videoId: string;
  title: string;
  description: string | null;
  publishedAt: string;
  thumbnails: Thumbnail[];
  tags: string[];
  lengthSeconds: number;
  isFamilySafe: boolean;
  isLiveContent: boolean;
  viewCount: string;
  channelId: string;
  channelTitle: string;
  channelThumbnail: string;
  channelSubscribeCount?: number;
  relatedVideos: RelatedVideo[];
  videoFormats: {
    quality: string;
    qualityLabel: string;
    fileSize: string;
  }[];
  audioFormats: {
    audioBitrate: string;
    fileSize: string;
  }[];
}

export interface VideoState {
  videos: {
    status: AsyncStatus;
    error: string;
    mostPopular?: VideosResponse;
  };
  video: {
    status: AsyncStatus;
    item: Record<string, VideoInfoResponse>;
    error: string;
  };
}

export type DownloadFileType = 'video' | 'audioonly';