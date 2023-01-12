export interface Snippet {
  categoryId: string;
  channelId: string;
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
