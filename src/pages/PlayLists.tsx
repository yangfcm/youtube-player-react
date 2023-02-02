import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { usePlayLists } from "../features/user/usePlayLists";
import { RequireAuth } from "../components/RequireAuth";
import { PlayListCard } from "../components/PlayListCard";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MoreButton } from "../components/MoreButton";
import { AsyncStatus } from "../settings/types";
import { NoContent } from "../components/NoContent";

export function PlayLists() {
  const { playLists = [], status, error, hasMore, fetchMore } = usePlayLists();

  return (
    <RequireAuth>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Play List
      </Typography>
      {status === AsyncStatus.LOADING && playLists.length === 0 && (
        <LoadingSpinner />
      )}
      {status === AsyncStatus.SUCCESS && playLists.length === 0 && (
        <NoContent>You haven't created any playlists.</NoContent>
      )}
      <Box sx={{ pb: 2 }}>
        <Grid container spacing={2} sx={{ pb: 2 }}>
          {playLists.map((playList, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <PlayListCard
                  playlist={{
                    id: playList.id as string,
                    title: playList.snippet.title,
                    imageUrl: playList.snippet.thumbnails.high?.url,
                    videoCount: playList.contentDetails.itemCount,
                  }}
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
            More playlists
          </MoreButton>
        )}
      </Box>
    </RequireAuth>
  );
}
