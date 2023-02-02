import { useParams, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MoreButton } from "../components/MoreButton";
import { AsyncStatus } from "../settings/types";
import { usePlaylistVideos } from "../features/playlist/usePlaylistVideos";

export function PlayListVideos() {
  const { id } = useParams();
  const { playlistVideos, status, error, hasMore, fetchMore } =
    usePlaylistVideos(id || "");

  return (
    <Box>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Playlist Videos
      </Typography>
      {status === AsyncStatus.LOADING && playlistVideos.length === 0 && (
        <LoadingSpinner />
      )}
      {playlistVideos.map((video, index) => (
        <Box key={video.id as string}>{video.snippet.title}</Box>
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
