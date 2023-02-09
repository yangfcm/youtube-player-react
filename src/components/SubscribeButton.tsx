import Button from "@mui/material/Button";
import { RequireAuth } from "./RequireAuth";
import { useSubscribe } from "../features/user/useSubscribe";
import { AsyncStatus } from "../settings/types";
import { UNSUBSCRIBED } from "../settings/constant";

function SubscribeButtonComp({ channelId }: { channelId: string }) {
  const { status, subscriptionId } = useSubscribe(channelId);
  console.log(subscriptionId);

  if (!subscriptionId) return null;

  return (
    <Button
      variant="outlined"
      size="small"
      disabled={status === AsyncStatus.LOADING}
      sx={{ width: "130px" }}
    >
      {subscriptionId === UNSUBSCRIBED ? "Unsubscribed" : "Subscribed"}
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
