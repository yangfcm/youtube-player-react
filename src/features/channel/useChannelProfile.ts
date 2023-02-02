import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchChannelProfile } from "./channelSlice";

export function useChannelProfile(channelId: string) {
  const dispatch = useAppDispatch();
  const asyncStatus = useSelector(
    (state: RootState) => state.channel.profile.status
  );
  const error = useSelector((state: RootState) => state.channel.profile.error);
  const channelProfile = useSelector(
    (state: RootState) => state.channel.profile.data[channelId]
  );

  useEffect(() => {
    if (channelId && !channelProfile) {
      dispatch(fetchChannelProfile({ channelId }));
    }
  }, [channelId, dispatch]);

  return {
    status: asyncStatus,
    error,
    channelProfile,
  };
}
