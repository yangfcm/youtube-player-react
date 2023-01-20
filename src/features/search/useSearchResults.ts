import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchResults } from "./searchSlice";

export function useSearchResults(q: string) {
  const dispatch = useAppDispatch();
  const searchResults = useSelector(
    (state: RootState) => state.search.results?.items
  );
  const asyncStatus = useSelector((state: RootState) => state.search.status);
  const error = useSelector((state: RootState) => state.search.error);
  const nextPageToken = useSelector(
    (state: RootState) => state.search.results?.nextPageToken
  );

  const fetchMore = useCallback(() => {
    if (nextPageToken) {
      dispatch(fetchResults({ q, pageToken: nextPageToken }));
    }
  }, [nextPageToken, dispatch, q]);

  useEffect(() => {
    if (!searchResults?.length) {
      dispatch(fetchResults({ q, pageToken: "" }));
    }
  }, [dispatch, q, searchResults?.length]);

  return {
    searchResults,
    status: asyncStatus,
    error: error?.message || "",
    hasMore: !!nextPageToken,
    fetchMore,
  };
}
