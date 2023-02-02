import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useChannelPlaylists } from "../features/channel/useChannelPlaylists";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";
import { MoreButton } from "../components/MoreButton";
import { ErrorMessage } from "../components/ErrorMessage";
import { NoContent } from "../components/NoContent";
import { PlayListCard } from "../components/PlayListCard";

export function ChannelPlayLists() {
  const { id = "" } = useParams();
  const {
    channelPlaylists = [],
    status,
    error,
    hasMore,
    fetchMore,
  } = useChannelPlaylists(id);

  if (status === AsyncStatus.IDLE) return null;
  if (status === AsyncStatus.LOADING && channelPlaylists.length === 0)
    return <LoadingSpinner />;
  if (status === AsyncStatus.SUCCESS && channelPlaylists.length === 0)
    return <NoContent>There is no playlist in the channel</NoContent>;

  return (
    <Box sx={{ py: 2 }}>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Grid container spacing={2} sx={{ pb: 2 }}>
        {channelPlaylists.map((playlist, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <PlayListCard
                playlist={{
                  id: playlist.id as string,
                  title: playlist.snippet.title,
                  imageUrl: playlist.snippet.thumbnails.high?.url,
                  videoCount: playlist.contentDetails.itemCount,
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
          More
        </MoreButton>
      )}
    </Box>
  );
}
