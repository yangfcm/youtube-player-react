import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchPlayLists } from "./userSlice";

export function usePlayLists() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useSelector(
    (state: RootState) => state.user.playlists
  );
  const nextPageToken = data?.nextPageToken;
  const userId = useSelector((state: RootState) => state.user.profile?.id);

  const fetchMore = useCallback(() => {
    if (nextPageToken) {
      dispatch(fetchPlayLists({ pageToken: nextPageToken }));
    }
  }, [nextPageToken, dispatch]);

  useEffect(() => {
    if (userId && !data) dispatch(fetchPlayLists());
  }, [userId, dispatch, data]);

  return {
    playLists: data?.items,
    status,
    error,
    hasMore: !!nextPageToken,
    fetchMore,
  };
}
