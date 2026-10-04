import ytdl from "@distube/ytdl-core";

export type User = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  lastLogin: number;
  accessToken: string;
  avatar: string;
  subscriptions?: string[];
};

export type VideoInfo = {
  videoId: string;
  title: string;
  description: string | null;
  publishedAt: string;
  thumbnails: Thumbnail[];
  tags: string[];
  lengthSeconds: string;
  isFamilySafe: boolean;
  isLiveContent: boolean;
  viewCount: string;
  channelId: string;
  channelTitle: string;
  channelThumbnail: string;
  channelSubscriberCount?: number;
  relatedVideos: {
    videoId?: string;
    title?: string;
    publishedAt?: string;
    lengthSeconds?: number;
    viewCount?: string;
    shortViewCountText?: string;
    thumbnail: string;
    channelId: string;
    channelTitle: string;
    channelThumbnail?: string;
  }[];
  // videoFormats,
  // audioFormats,
};

export type Video = {
  id: string;
  title: string;
  description?: string;
  channelId: string;
  channelTitle: string;
  imageUrl: string;
  liveBroadcastContent?: string;
  publishTimestamp: number;
  isActive: boolean;
};

export type Thumbnail = {
  height?: number;
  width?: number;
  url: string;
};

export type VideoSnippet = {
  id: {
    videoId: string;
    kind: string;
  };
  etag: string;
  kind: string;
  snippet: {
    title: string;
    description: string;
    categoryId: string;
    channelId: string;
    channelTitle: string;
    publishedAt: Date;
    tags: string[];
    liveBroadcastContent?: string;
    thumbnails: {
      default?: Thumbnail;
      high?: Thumbnail;
      maxres?: Thumbnail;
      medium?: Thumbnail;
      standard?: Thumbnail;
    };
    resourceId?: {
      kind: string;
      videoId: string;
    };
  };
};

export type SubscriptionDiff = {
  subscribed: string[];
  unsubscribed: string[];
};

export type Channel = {
  id: string;
  kind: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default?: Thumbnail;
      high?: Thumbnail;
      medium?: Thumbnail;
    };
  };
  contentDetails: {
    relatedPlaylists?: {
      uploads?: string;
    };
  };
};

export type ChannelResponse = {
  etag: string;
  kind: string;
  items: Channel[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  nextPageToken?: string;
};

export type Subscription = {
  id: string;
  kind: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default?: Thumbnail;
      high?: Thumbnail;
      medium?: Thumbnail;
    };
    resourceId: {
      kind: string;
      channelId: string;
    };
  };
};

export type SubscriptionResponse = {
  etag: string;
  kind: string;
  items: Subscription[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  nextPageToken?: string;
};

export type Download = {
  url: string;
  fileName: string;
  contentType: string;
  fileBucketPath: string;
  filter: ytdl.Filter;
  downloadUrl: string;
  expiredAt: number;
  status: number;
  error: string;
};
