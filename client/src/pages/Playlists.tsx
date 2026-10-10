import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { RequireAuth } from "../components/RequireAuth";
import { useSavedPlaylists } from "../features/playlist/useSavedPlaylists";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";
import { PlayListCard } from "../components/PlayListCard";
import { NoContent } from "../components/NoContent";
import { RequireLoginPage } from "../components/RequireLoginPage";

export default function Playlists() {
  const { playlists, status, error } = useSavedPlaylists();

  return (
    <RequireAuth unAuthedComponent={<RequireLoginPage />}>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Typography variant="h5" sx={{ mb: 2 }}>
        My Playlists
      </Typography>
      {status === AsyncStatus.LOADING && playlists.length === 0 && (
        <LoadingSpinner />
      )}
      {status === AsyncStatus.SUCCESS && playlists.length === 0 && (
        <NoContent>You haven't saved any playlist.</NoContent>
      )}
      <Box sx={{ pb: 2 }}>
        <Grid container spacing={2} sx={{ pb: 2 }}>
          {playlists.map((playlist) => (
            <Grid item xs={6} sm={3} lg={2} key={playlist.id}>
              <PlayListCard
                playlist={{
                  id: playlist.id,
                  title: playlist.title,
                  imageUrl: playlist.thumbnail,
                  videoCount: playlist.itemCount,
                  channelId: playlist.channelId,
                  channelTitle: playlist.channelTitle,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </RequireAuth>
  );
}
