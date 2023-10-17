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
}

export interface TimelineState {
  videos: TimelineVideo[];
  status: AsyncStatus;
  error: string;
}
