import { AsyncStatus } from "../../settings/types";

export interface Channel {
  id: string;
  title: string;
  thumbnail: string;
}

export interface SubscriptionState {
  status: AsyncStatus; // Loading state of the subscribed channel list.
  error: string; // Error of the list itself.
  channels: Channel[]; // Subscribed channels, in the order of users.subscriptions.
  ids: Record<string, boolean>; // channelId -> subscribed, for a quick lookup by SubscribeButton.
  pending: Record<string, boolean>; // channelId -> a subscribe/unsubscribe write is in flight.
  errors: Record<string, string>; // channelId -> error of the last write, so only that button reports it.
}
