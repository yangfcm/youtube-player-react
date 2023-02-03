import { useState, useEffect, useCallback } from "react";
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
  const currentQuery = useSelector((state: RootState) => state.search.query);
  const [queryChanged, setQueryChanged] = useState(false);

  const fetchMore = useCallback(() => {
    if (nextPageToken) {
      dispatch(fetchResults({ q, pageToken: nextPageToken }));
    }
  }, [nextPageToken, dispatch, q]);

  useEffect(() => {
    if (!searchResults?.length || currentQuery !== q) {
      // Fetch the first page.
      dispatch(fetchResults({ q, pageToken: "" }));
    }
  }, [dispatch, q, currentQuery, searchResults?.length]);

  useEffect(() => {
    setQueryChanged(currentQuery !== q);
  }, [currentQuery, q]);

  return {
    searchResults,
    status: asyncStatus,
    error,
    hasMore: !!nextPageToken,
    queryChanged,
    fetchMore,
  };
}
