import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  fetchUserCollection,
  resetCollectionFetchStatus,
} from "./collectionSlice";
import { AsyncStatus } from "../../settings/types";

export function useCollection(collectionId: string) {
  const dispatch = useAppDispatch();

  const userId = useSelector(
    (state: RootState) => state.user.profile?.data?.id,
  );
  const collection = useSelector((state: RootState) =>
    state.collection.collections.find((c) => c.id === collectionId),
  );
  const collectionData = useSelector(
    (state: RootState) => state.collection.collectionsData[collectionId],
  );
  // Items already in redux from a previous fetch - no need to refetch.
  const cached = !!collection && collection.items !== null;
  const status = cached
    ? AsyncStatus.SUCCESS
    : (collectionData?.fetchStatus ?? AsyncStatus.IDLE);
  const error = collectionData?.fetchError ?? "";

  useEffect(() => {
    if (userId && collectionId && !cached) {
      dispatch(fetchUserCollection({ userId, collectionId }));
    }
  }, [dispatch, userId, collectionId, cached]);

  const reset = useCallback(() => {
    dispatch(resetCollectionFetchStatus(collectionId));
  }, [collectionId, dispatch]);

  return { collection, status, error, reset };
}
