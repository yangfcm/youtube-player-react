import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { updateCollection as updateCollectionAction } from "./collectionSlice";
import { AsyncStatus } from "../../settings/types";

export function useUpdateCollection(collectionId: string) {
  const dispatch = useAppDispatch();

  const collectionData = useSelector(
    (state: RootState) => state.collection.collectionsData[collectionId],
  );
  const status = collectionData?.mutateStatus ?? AsyncStatus.IDLE;
  const error = collectionData?.mutateError ?? "";

  const updateCollection = useCallback(
    (data: { name?: string; thumbnail?: string }) => {
      dispatch(updateCollectionAction({ collectionId, ...data }));
    },
    [collectionId, dispatch],
  );

  return { updateCollection, status, error };
}
