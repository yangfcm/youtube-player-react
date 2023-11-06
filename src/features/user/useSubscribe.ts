import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { AsyncStatus } from "../../settings/types";
import {
  fetchSubscriptionIdAPI,
  subscribeChannelAPI,
  unsubscribeChannelAPI,
} from "./userAPI";
import { receiveSubscriptionId, subscribed, unsubscribed } from "./userSlice";
import { UNSUBSCRIBED } from "../../settings/constant";

export function useSubscribe(channelId: string) {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(AsyncStatus.IDLE);
  const [error, setError] = useState("");
  const subscriptionId = useSelector(
    (state: RootState) => state.user.subscriptions.subscriptionIds[channelId]
  );

  const fetchChannelSubscription = useCallback(async () => {
    try {
      setStatus(AsyncStatus.LOADING);
      setError("");
      const response = await fetchSubscriptionIdAPI(channelId);
      const subscriptionId = response.data.items[0]?.id || UNSUBSCRIBED;
      dispatch(
        receiveSubscriptionId({
          channelId,
          subscriptionId,
        })
      );
      setStatus(AsyncStatus.SUCCESS);
    } catch (e: any) {
      setError(e.message);
      setStatus(AsyncStatus.FAIL);
    }
  }, [channelId, dispatch]);

  const subscribeChannel = useCallback(async () => {
    try {
      setStatus(AsyncStatus.LOADING);
      setError("");
      const response = await subscribeChannelAPI(channelId);
      dispatch(
        subscribed({
          channelId,
          subscription: response.data,
        })
      );
      setStatus(AsyncStatus.SUCCESS);
    } catch (e: any) {
      setError(e.message);
      setStatus(AsyncStatus.FAIL);
    }
  }, [channelId, dispatch]);

  const unsubscribeChannel = useCallback(
    async (subscriptionId: string) => {
      try {
        setStatus(AsyncStatus.LOADING);
        setError("");
        await unsubscribeChannelAPI(subscriptionId);
        dispatch(
          unsubscribed({
            channelId,
          })
        );
        setStatus(AsyncStatus.SUCCESS);
      } catch (e: any) {
        setError(e.message);
        setStatus(AsyncStatus.FAIL);
      }
    },
    [channelId, dispatch]
  );

  useEffect(() => {
    if (!subscriptionId) {
      fetchChannelSubscription();
    }
  }, [channelId, subscriptionId, fetchChannelSubscription]);

  return {
    status,
    error,
    subscriptionId,
    subscribeChannel,
    unsubscribeChannel,
  };
}
