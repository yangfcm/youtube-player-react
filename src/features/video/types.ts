export interface Thumbnail {
  height: number;
  width: number;
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

export interface Meta {
  id: string | { videoId: string };
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
