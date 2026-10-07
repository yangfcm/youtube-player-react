import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Channel } from "./types";
import { subscribeChannel, unsubscribeChannel } from "./subscriptionSlice";

export function useSubscribe(channelId: string) {
  const dispatch = useAppDispatch();
  // Only this channel's own write error - the shared list error is reported by the page.
  const error = useSelector(
    (state: RootState) => state.subscription.errors[channelId] || "",
  );
  const subscribed = useSelector((state: RootState) =>
    !!state.user.profile.data?.subscriptions?.includes(channelId),
  );
  const writing = useSelector(
    (state: RootState) => !!state.subscription.pending[channelId],
  );
  const userId = useSelector(
    (state: RootState) => state.user.profile?.data?.id,
  );

  const subscribe = useCallback(
    (channel: Channel) => {
      if (!userId) return;
      dispatch(subscribeChannel({ userId, channel }));
    },
    [userId, dispatch],
  );

  const unsubscribe = useCallback(() => {
    if (!userId) return;
    dispatch(unsubscribeChannel({ userId, channelId }));
  }, [userId, channelId, dispatch]);

  return {
    subscribed,
    loading: writing,
    error,
    subscribe,
    unsubscribe,
  };
}
