import LoadingButton from "@mui/lab/LoadingButton";
import { RequireAuth } from "./RequireAuth";
import { useSubscribe } from "../features/subscription/useSubscribe";
import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";

type SubscribeButtonProps = {
  channelId: string;
  title: string;
  thumbnail: string;
};

function SubscribeButtonComp({
  channelId,
  title,
  thumbnail,
}: SubscribeButtonProps) {
  const {
    subscribed,
    ready,
    loading,
    error,
    subscribe,
    unsubscribe,
  } = useSubscribe(channelId);
  const [subscribedText, setSubscribedText] = useState("Subscribed");

  return (
    <>
      <ErrorMessage open={!!error}>{error}</ErrorMessage>
      <LoadingButton
        loading={loading}
        variant={subscribed ? "contained" : "outlined"}
        size="small"
        disabled={loading || !ready}
        sx={{ width: "130px" }}
        onMouseOver={() => {
          if (subscribed) setSubscribedText("Unsubscribe");
        }}
        onMouseLeave={() => {
          if (subscribed) setSubscribedText("Subscribed");
        }}
        onClick={() => {
          if (subscribed) {
            unsubscribe();
          } else {
            subscribe({ id: channelId, title, thumbnail });
          }
        }}
      >
        {subscribed ? subscribedText : "Subscribe"}
      </LoadingButton>
    </>
  );
}

export function SubscribeButton(props: SubscribeButtonProps) {
  return (
    <RequireAuth>
      <SubscribeButtonComp {...props} />
    </RequireAuth>
  );
}
