import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchUserCollections } from "./collectionSlice";
import { AsyncStatus } from "../../settings/types";

export function useCollections() {
  const dispatch = useAppDispatch();
  const { collections, status, error } = useSelector(
    (state: RootState) => state.collection,
  );
  const userId = useSelector(
    (state: RootState) => state.user.profile?.data?.id,
  );

  useEffect(() => {
    if (userId && status === AsyncStatus.IDLE) {
      dispatch(fetchUserCollections(userId));
    }
  }, [userId, status, dispatch]);

  return { collections, status, error };
}
