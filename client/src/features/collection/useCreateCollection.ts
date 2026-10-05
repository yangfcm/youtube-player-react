import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import {
  createCollection as createCollectionAction,
  resetCreateStatus,
} from "./collectionSlice";
import { CollectionItem } from "./types";

export function useCreateCollection() {
  const dispatch = useAppDispatch();

  const status = useSelector(
    (state: RootState) => state.collection.createStatus
  );
  const error = useSelector(
    (state: RootState) => state.collection.createError
  );
  const userId = useSelector(
    (state: RootState) => state.user.profile?.data?.id
  );

  const createCollection = useCallback(
    (name: string, item: CollectionItem) => {
      if (!userId) return;
      dispatch(createCollectionAction({ userId, name, item }));
    },
    [userId, dispatch]
  );

  const reset = useCallback(() => {
    dispatch(resetCreateStatus());
  }, [dispatch]);

  return { createCollection, status, error, reset };
}
