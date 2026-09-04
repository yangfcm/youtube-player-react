import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { AsyncStatus } from "../../settings/types";
import { fetchSubscribedChannels } from "./subscriptionSlice";

export function useSubscriptions() {
  const dispatch = useAppDispatch();
  const { channels, status, error } = useSelector(
    (state: RootState) => state.subscription
  );
  const userId = useSelector(
    (state: RootState) => state.user.profile?.data?.id
  );

  useEffect(() => {
    if (userId && status === AsyncStatus.IDLE) {
      dispatch(fetchSubscribedChannels(userId));
    }
  }, [userId, status, dispatch]);

  return { channels, status, error };
}
