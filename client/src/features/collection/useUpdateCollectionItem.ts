import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import {
  updateCollectionItem as updateCollectionItemAction,
  resetCollectionMutateStatus,
} from "./collectionSlice";
import { AsyncStatus } from "../../settings/types";
import { CollectionItem, CollectionItemOperation } from "./types";

export function useUpdateCollectionItem(collectionId: string) {
  const dispatch = useAppDispatch();

  const collectionData = useSelector(
    (state: RootState) => state.collection.collectionsData[collectionId],
  );
  const status = collectionData?.mutateStatus ?? AsyncStatus.IDLE;
  const error = collectionData?.mutateError ?? "";

  const updateCollectionItem = useCallback(
    (item: CollectionItem, operation: CollectionItemOperation) => {
      dispatch(updateCollectionItemAction({ collectionId, item, operation }));
    },
    [collectionId, dispatch],
  );

  const reset = useCallback(() => {
    dispatch(resetCollectionMutateStatus(collectionId));
  }, [collectionId, dispatch]);

  return { updateCollectionItem, status, error, reset };
}
