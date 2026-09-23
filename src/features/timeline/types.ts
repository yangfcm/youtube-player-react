import { AsyncStatus } from "../../settings/types";

export interface TimelineVideo {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  description: string;
  publishTimestamp: number;
  liveBroadcastContent: string;
  imageUrl: string;
  isActive: boolean;
}

export interface TimelineState {
  videos: TimelineVideo[];
  meta: TimelineMetaData | null;
  status: AsyncStatus;
  error: string;
  hideStatus: AsyncStatus;
  hideError: string;
}

export interface TimelineMetaData {
  totalCount: number;
  updatedAt: number;
  loading: boolean;
}
