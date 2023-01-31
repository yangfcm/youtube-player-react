export interface CommentSnippet {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    videoId: string;
    totalReplyCount: number;
    isPublic: boolean;
    canReply: boolean;
    topLevelComment: {
      id: string;
      etag: string;
      kind: string;
      snippet: {
        authorChannelId: {
          value: string;
        };
        authorChannelUrl: string;
        authorDisplayName: string;
        authorProfileImageUrl: string;
        canRate: boolean;
        likeCount: number;
        publishedAt: Date;
        textDisplay: string;
        textOriginal: string;
        updatedAt: Date;
        videoId: string;
        viewerRating: string;
      };
    };
  };
}

export interface ReplySnippet {
  authorChannelId: {
    value: string;
  };
  authorChannelUrl: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  canRate: boolean;
  likeCount: number;
  parentId: string;
  publishedAt: Date;
  textDisplay: string;
  textOriginal: string;
  updatedAt: Date;
  viewerRating: string;
}

export interface CommentResponse {
  etag: string;
  kind: string;
  items: CommentSnippet[];
  nextPageToken?: string;
  pageInfo?: {
    resultsPerPage?: number;
    totalResults?: number;
  };
}

export interface ReplyResponse {
  etag: string;
  kind: string;
  items: ReplySnippet[];
  nextPageToken?: string;
  pageInfo?: {
    resultsPerPage?: number;
    totalResults?: number;
  };
}
