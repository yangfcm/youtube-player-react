import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { RequireAuth } from "../components/RequireAuth";
import { useSubscriptions } from "../features/subscription/useSubscriptions";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";
import { ChannelCard } from "../components/ChannelCard";
import { NoContent } from "../components/NoContent";
import { RequireLoginPage } from "../components/RequireLoginPage";

export default function Subscriptions() {
  const { channels, status, error } = useSubscriptions();

  return (
    <RequireAuth unAuthedComponent={<RequireLoginPage />}>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Subscriptions
      </Typography>
      {status === AsyncStatus.LOADING && channels.length === 0 && (
        <LoadingSpinner />
      )}
      {status === AsyncStatus.SUCCESS && channels.length === 0 && (
        <NoContent> You haven't subscribed any channel.</NoContent>
      )}
      <Box sx={{ pb: 2 }}>
        <Grid container spacing={2} sx={{ pb: 2 }}>
          {channels.map((channel) => (
            <Grid item xs={6} sm={3} lg={2} key={channel.id}>
              <ChannelCard
                id={channel.id}
                title={channel.title}
                imageUrl={channel.thumbnail}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </RequireAuth>
  );
}
