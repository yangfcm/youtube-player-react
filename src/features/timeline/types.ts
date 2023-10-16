import { AsyncStatus } from "../../settings/types";

export interface TimelineVideo {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  description: string;
  publishTimestamp: number;
  liveBroadcastContent: string;
}

export interface TimelineState {
  videos: TimelineVideo[];
  status: AsyncStatus;
  error: string;
}
