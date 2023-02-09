import Button from "@mui/material/Button";
import { RequireAuth } from "./RequireAuth";
import { useSubscribe } from "../features/user/useSubscribe";
import { AsyncStatus } from "../settings/types";
import { UNSUBSCRIBED } from "../settings/constant";
import { useState } from "react";

function SubscribeButtonComp({ channelId }: { channelId: string }) {
  const { status, subscriptionId } = useSubscribe(channelId);
  const subscribed = subscriptionId !== UNSUBSCRIBED;
  const [subscribedText, setSubscribedText] = useState("Subscribed");

  if (!subscriptionId) return null;

  return (
    <Button
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
    >
      {subscribed ? subscribedText : "Subscribe"}
    </Button>
  );
}

export function SubscribeButton({ channelId }: { channelId: string }) {
  return (
    <RequireAuth showLoginButton={false}>
      <SubscribeButtonComp channelId={channelId} />
    </RequireAuth>
  );
}
