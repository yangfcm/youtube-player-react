import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { deleteCollection as deleteCollectionAction } from "./collectionSlice";
import { AsyncStatus } from "../../settings/types";

export function useDeleteCollection(collectionId: string) {
  const dispatch = useAppDispatch();

  const userId = useSelector(
    (state: RootState) => state.user.profile?.data?.id,
  );
  const collectionData = useSelector(
    (state: RootState) => state.collection.collectionsData[collectionId],
  );
  const status = collectionData?.mutateStatus ?? AsyncStatus.IDLE;
  const error = collectionData?.mutateError ?? "";

  const deleteCollection = useCallback(() => {
    if (!userId) return;
    dispatch(deleteCollectionAction({ userId, collectionId }));
  }, [userId, collectionId, dispatch]);

  return { deleteCollection, status, error };
}
