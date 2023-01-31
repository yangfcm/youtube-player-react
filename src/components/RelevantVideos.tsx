import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useRelevantVideos } from "../features/search/useRelevantVideos";
import { VideoItem } from "./VideoItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";

export function RelevantVideos({ videoId }: { videoId: string }) {
  const { videos, status, error } = useRelevantVideos(videoId);
  if (status === AsyncStatus.LOADING) return <LoadingSpinner />;
  return (
    <>
      {status === AsyncStatus.FAIL && (
        <Alert severity="error" sx={{ justifyContent: "center" }}>
          {error}
        </Alert>
      )}
      {videos &&
        videos.map((video, index) => (
          <Box sx={{ mb: 1 }} key={index}>
            <VideoItem key={index} video={video} />
          </Box>
        ))}
    </>
  );
}
