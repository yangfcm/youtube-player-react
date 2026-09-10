import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchUserCollections } from "./collectionSlice";

export function useCollections() {
  const dispatch = useAppDispatch();
  const { collections, status, error } = useSelector(
    (state: RootState) => state.collection
  );
  const userId = useSelector(
    (state: RootState) => state.user.profile?.data?.id
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserCollections(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { collections, status, error };
}
