import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchSubscriptions } from "./userSlice";

export function useSubscriptions() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useSelector(
    (state: RootState) => state.user.subscriptions
  );
  const nextPageToken = data?.nextPageToken;
  const userId = useSelector(
    (state: RootState) => state.user.profile?.data?.id
  );

  const fetchMore = useCallback(() => {
    if (nextPageToken) {
      dispatch(fetchSubscriptions({ pageToken: nextPageToken }));
    }
  }, [nextPageToken, dispatch]);

  useEffect(() => {
    if (userId && !data) dispatch(fetchSubscriptions());
  }, [userId, dispatch, data]);

  return {
    subscriptions: data?.items,
    status,
    error,
    hasMore: !!nextPageToken,
    fetchMore,
  };
}
