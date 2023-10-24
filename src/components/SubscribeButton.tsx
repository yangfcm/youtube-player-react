import LoadingButton from "@mui/lab/LoadingButton";
import { RequireAuth } from "./RequireAuth";
import { useSubscribe } from "../features/user/useSubscribe";
import { AsyncStatus } from "../settings/types";
import { UNSUBSCRIBED } from "../settings/constant";
import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { updateUserSubscriptions } from "../app/firebaseServices";
import { useProfile } from "../features/user/useProfile";

function SubscribeButtonComp({ channelId }: { channelId: string }) {
  const {
    status,
    subscriptionId,
    subscribeChannel,
    unsubscribeChannel,
    error,
  } = useSubscribe(channelId);
  const subscribed = subscriptionId !== UNSUBSCRIBED;
  const [subscribedText, setSubscribedText] = useState("Subscribed");
  const user = useProfile();

  if (!subscriptionId) return null;

  return (
    <>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <LoadingButton
        loading={status === AsyncStatus.LOADING}
        variant={subscribed ? "contained" : "outlined"}
        size="small"
        disabled={status === AsyncStatus.LOADING}
        sx={{ width: "130px" }}
        onMouseOver={() => {
          if (subscribed) setSubscribedText("Unsubscribe");
        }}
        onMouseLeave={() => {
          if (subscribed) setSubscribedText("Subscribed");
        }}
        onClick={() => {
          if (subscribed) {
            unsubscribeChannel(subscriptionId).then(() => {
              updateUserSubscriptions(user?.id || '', channelId, 'unsubscribe');
            });
          } else {
            subscribeChannel().then(() => {
              updateUserSubscriptions(user?.id || '', channelId, 'subscribe');
            });
          }
        }}
      >
        {subscribed ? subscribedText : "Subscribe"}
      </LoadingButton>
    </>
  );
}

export function SubscribeButton({ channelId }: { channelId: string }) {
  return (
    <RequireAuth showLoginButton={false}>
      <SubscribeButtonComp channelId={channelId} />
    </RequireAuth>
  );
}
