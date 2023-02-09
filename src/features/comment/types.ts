import { AsyncStatus } from "../../settings/types";

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
  etag: string;
  id: string;
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
    parentId: string;
    publishedAt: Date;
    textDisplay: string;
    textOriginal: string;
    updatedAt: Date;
    viewerRating: string;
  };
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

export type CommentOrder = "relevance" | "time";

export type VideoCommentRequestBody = {
  snippet: {
    videoId: string;
    topLevelComment: {
      snippet: {
        textOriginal: string;
      };
    };
  };
};

export interface CommentState {
  comments: Record<
    string,
    {
      status: AsyncStatus;
      error: string;
      // data: CommentResponse | null;
      data: {
        relevance?: CommentResponse;
        time?: CommentResponse;
      };
      order: CommentOrder;
    }
  >;
  replies: Record<
    string,
    {
      status: AsyncStatus;
      error: string;
      data: ReplyResponse | null;
    }
  >;
  postStatus: AsyncStatus;
  postError: string;
}
