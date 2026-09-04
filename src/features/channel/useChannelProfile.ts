import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { AsyncStatus } from "../../settings/types";
import { fetchChannelProfile } from "./channelSlice";

export function useChannelProfile(channelId: string) {
  const dispatch = useAppDispatch();
  const asyncStatus = useSelector(
    (state: RootState) =>
      state.channel.profile.status[channelId] || AsyncStatus.IDLE
  );
  const error = useSelector(
    (state: RootState) => state.channel.profile.error[channelId]
  );
  const channelProfile = useSelector(
    (state: RootState) => state.channel.profile.data[channelId]
  );

  useEffect(() => {
    if (
      channelId &&
      !channelProfile &&
      asyncStatus !== AsyncStatus.LOADING &&
      asyncStatus !== AsyncStatus.FAIL
    ) {
      dispatch(fetchChannelProfile({ channelId }));
    }
  }, [channelId, dispatch, channelProfile, asyncStatus]);

  return {
    status: asyncStatus,
    error,
    channelProfile,
  };
}
