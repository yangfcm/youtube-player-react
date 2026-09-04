import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchSubscribedChannels } from "./subscriptionSlice";

export function useSubscriptions() {
  const dispatch = useAppDispatch();
  const { channels, status, error } = useSelector(
    (state: RootState) => state.subscription
  );
  const userId = useSelector(
    (state: RootState) => state.user.profile?.data?.id
  );

  // Always refetch on mount rather than only when idle, so the list is
  // never left stuck showing a stale/empty result from an earlier mount.
  useEffect(() => {
    if (userId) {
      dispatch(fetchSubscribedChannels(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, dispatch]);

  return { channels, status, error };
}
