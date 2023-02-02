import Box from "@mui/material/Box";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MoreButton } from "../components/MoreButton";
import { AsyncStatus } from "../settings/types";
import { usePlaylistVideos } from "../features/playlist/usePlaylistVideos";
import { VideoItem } from "../components/VideoItem";

export function PlayListVideos({ playlistId }: { playlistId: string }) {
  const { playlistVideos, status, error, hasMore, fetchMore } =
    usePlaylistVideos(playlistId);

  return (
    <Box sx={{ pb: 2 }}>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      {status === AsyncStatus.LOADING && playlistVideos.length === 0 && (
        <LoadingSpinner />
      )}
      {playlistVideos.map((video) => (
        <Box key={video.contentDetails.videoId} sx={{ mb: 1 }}>
          <VideoItem
            video={{
              id: video.contentDetails.videoId,
              title: video.snippet.title,
              imageUrl: video.snippet.thumbnails?.high?.url || "",
              publishedAt: video.contentDetails.videoPublishedAt,
              channelTitle: video.snippet.videoOwnerChannelTitle,
              channelId: video.snippet.videoOwnerChannelId,
              playlistId,
            }}
          />
        </Box>
      ))}
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
