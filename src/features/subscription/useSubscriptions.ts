import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchSubscribedChannels } from "./subscriptionSlice";

export function useSubscriptions() {
  const dispatch = useAppDispatch();
  const { channels, status, error } = useSelector(
    (state: RootState) => state.subscription
  );
  const userId = useSelector(
    (state: RootState) => state.user.profile?.data?.id
  );

  // Fetch once per mount, using whatever userId is already available right
  // then (covers navigating here while already signed in). Deliberately NOT
  // reactive to userId - if the user signs in while this page stays
  // mounted, useAuth's post-login flow dispatches this fetch itself, after
  // awaiting its own Firestore write to the same doc. Reacting to userId
  // here too would fire a second, unsequenced fetch that can race that
  // write and read back stale/empty data.
  useEffect(() => {
    if (userId) {
      dispatch(fetchSubscribedChannels(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { channels, status, error };
}
