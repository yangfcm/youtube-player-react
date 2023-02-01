import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { RequireAuth } from "../components/RequireAuth";
import { useSubscriptions } from "../features/user/useSubscriptions";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MoreButton } from "../components/MoreButton";
import { AsyncStatus } from "../settings/types";

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

  if (status === AsyncStatus.IDLE) return null;
  if (status === AsyncStatus.LOADING && subscriptions.length === 0)
    return <LoadingSpinner />;

  return (
    <RequireAuth>
      <Box>
        <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
        <Grid container spacing={2}>
          {subscriptions.map((subscription) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={subscription.id}>
                {subscription.snippet.title}
              </Grid>
            );
          })}
        </Grid>
        {hasMore && (
          <MoreButton
            loading={status === AsyncStatus.LOADING}
            onClick={fetchMore}
          >
            More
          </MoreButton>
        )}
      </Box>
    </RequireAuth>
  );
}
