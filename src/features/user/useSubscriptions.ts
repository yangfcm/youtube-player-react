import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchSubscriptions } from "./userSlice";

export function useSubscriptions() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useSelector(
    (state: RootState) => state.user.subscriptions
  );
  const userId = useSelector((state: RootState) => state.user.profile?.id);

  useEffect(() => {
    if (userId) dispatch(fetchSubscriptions());
  }, [userId]);

  return {
    subscriptions: data,
    status,
    error,
  };
}
