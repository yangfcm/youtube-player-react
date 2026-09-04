import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { AsyncStatus } from "../../settings/types";
import { Channel } from "./types";
import {
  fetchSubscribedChannels,
  subscribeChannel,
  unsubscribeChannel,
} from "./subscriptionSlice";

export function useSubscribe(channelId: string) {
  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.subscription.status);
  // Only this channel's own write error - the shared list error is reported by the page.
  const error = useSelector(
    (state: RootState) => state.subscription.errors[channelId] || ""
  );
  const subscribed = useSelector(
    (state: RootState) => !!state.subscription.ids[channelId]
  );
  const writing = useSelector(
    (state: RootState) => !!state.subscription.pending[channelId]
  );
  const userId = useSelector(
    (state: RootState) => state.user.profile?.data?.id
  );

  useEffect(() => {
    if (userId && status === AsyncStatus.IDLE) {
      dispatch(fetchSubscribedChannels(userId));
    }
  }, [userId, status, dispatch]);

  const subscribe = useCallback(
    (channel: Channel) => {
      if (!userId) return;
      dispatch(subscribeChannel({ userId, channel }));
    },
    [userId, dispatch]
  );

  const unsubscribe = useCallback(() => {
    if (!userId) return;
    dispatch(unsubscribeChannel({ userId, channelId }));
  }, [userId, channelId, dispatch]);

  return {
    subscribed,
    // The subscription list has been loaded, so `subscribed` is trustworthy.
    ready: status === AsyncStatus.SUCCESS || status === AsyncStatus.FAIL,
    loading: writing || status === AsyncStatus.LOADING,
    error,
    subscribe,
    unsubscribe,
  };
}
