import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { usePlayLists } from "../features/user/usePlayLists";
import { RequireAuth } from "../components/RequireAuth";
import { PlayListCard } from "../components/PlayListCard";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MoreButton } from "../components/MoreButton";
import { AsyncStatus } from "../settings/types";

function NoPlayLists() {
  return (
    <Box sx={{ display: "d-flex", justifyContent: "center" }}>
      <Alert
        variant="filled"
        severity="error"
        sx={{ justifyContent: "center" }}
      >
        You haven't created any play lists.
      </Alert>
    </Box>
  );
}

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
        <NoPlayLists />
      )}
      <Box>
        <Grid container spacing={2} sx={{ pb: 2 }}>
          {playLists.map((playList, index) => {
            return (
              <Grid item xs={12} sm={3} lg={2} key={index}>
                {playList.snippet.title}
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
