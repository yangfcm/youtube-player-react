import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";
import { MoreButton } from "./MoreButton";
import { AsyncStatus } from "../settings/types";
import { usePlaylistVideos } from "../features/playlist/usePlaylistVideos";
import { VideoCard } from "./VideoCard";
import { NoContent } from "./NoContent";

export function PlayListVideos({ playlistId }: { playlistId: string }) {
  const {
    playlistVideos = [],
    status,
    error,
    hasMore,
    fetchMore,
  } = usePlaylistVideos(playlistId);

  return (
    <Box sx={{ pb: 2 }}>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      {status === AsyncStatus.LOADING && playlistVideos.length === 0 && (
        <LoadingSpinner />
      )}
      {(status === AsyncStatus.SUCCESS || status === AsyncStatus.FAIL) &&
        playlistVideos.length === 0 && (
          <NoContent>
            No videos in the playlist or playlist is unavailable.
          </NoContent>
        )}
      {/* <Typography variant="h5">
        More videos in the playlist
      </Typography> */}
      <Grid container spacing={2}>
        {playlistVideos.map((video) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={video.contentDetails.videoId}>
            <VideoCard
              video={{
                id: video.contentDetails.videoId,
                title: video.snippet.title,
                imageUrl: video.snippet.thumbnails?.high?.url || "",
                publishedAt: video.contentDetails.videoPublishedAt,
                channelTitle: video.snippet.videoOwnerChannelTitle,
                channelId: video.snippet.videoOwnerChannelId,
              }}
            />
          </Grid>
        ))}
      </Grid>
      {hasMore && (
        <MoreButton
          loading={status === AsyncStatus.LOADING}
          onClick={fetchMore}
        >
          More videos
        </MoreButton>
      )}
    </Box>
  );
}
