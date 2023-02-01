import { Thumbnail } from "../video/types";

export interface SubscriptionSnippet {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    channelId: string;
    description: string;
    title: string;
    publishedAt: Date;
    resourceId: {
      kind: string;
      channelId: string;
    };
    thumbnails: {
      default?: Thumbnail;
      high?: Thumbnail;
      medium?: Thumbnail;
    };
  };
}

export interface SubscriptionsResponse {
  etag: string;
  kind: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: SubscriptionSnippet[];
  nextPageToken?: string;
}
