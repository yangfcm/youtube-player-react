import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { RequireAuth } from "../components/RequireAuth";
import { useSubscriptions } from "../features/user/useSubscriptions";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MoreButton } from "../components/MoreButton";
import { AsyncStatus } from "../settings/types";
import { ChannelCard } from "../components/ChannelCard";

function NoSubscriptions() {
  return (
    <Box sx={{ display: "d-flex", justifyContent: "center" }}>
      <Alert
        variant="filled"
        severity="error"
        sx={{ justifyContent: "center" }}
      >
        You haven't subscribed any channel.
      </Alert>
    </Box>
  );
}

export function Subscriptions() {
  const {
    subscriptions = [],
    status,
    error,
    hasMore,
    fetchMore,
  } = useSubscriptions();

  return (
    <RequireAuth>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Subscriptions
      </Typography>
      {status === AsyncStatus.LOADING && subscriptions.length === 0 && (
        <LoadingSpinner />
      )}
      {status === AsyncStatus.SUCCESS && subscriptions.length === 0 && (
        <NoSubscriptions />
      )}
      <Box>
        <Grid container spacing={2} sx={{ pb: 2 }}>
          {subscriptions.map((subscription) => {
            return (
              <Grid item xs={6} sm={3} lg={2} key={subscription.id}>
                <ChannelCard
                  id={subscription.id}
                  title={subscription.snippet.title}
                  imageUrl={subscription.snippet.thumbnails.default?.url || ""}
                />
              </Grid>
            );
          })}
        </Grid>
        {hasMore && (
          <MoreButton
            loading={status === AsyncStatus.LOADING}
            onClick={fetchMore}
          >
            More subscriptions
          </MoreButton>
        )}
      </Box>
    </RequireAuth>
  );
}
