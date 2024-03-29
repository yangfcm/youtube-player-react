import { AsyncStatus } from "../../settings/types";
import { PlayListsResponse } from "../playlist/types";
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

export interface UserInfoResponse {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
  sub: string;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  lastName: string;
  firstName: string;
  avatar: string;
}

export interface UserState {
  profile: {
    status: AsyncStatus;
    error: string;
    data?: UserProfile;
  };
  token: string;
  expiresAt: number;
  subscriptions: {
    status: AsyncStatus;
    error: string;
    data?: SubscriptionsResponse;
    subscriptionIds: Record<string, string>;
  };
  playlists: {
    status: AsyncStatus;
    error: string;
    data?: PlayListsResponse;
  };
  isGoogleAuthEnabled: boolean;
}
