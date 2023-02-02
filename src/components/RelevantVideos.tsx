import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useRelevantVideos } from "../features/search/useRelevantVideos";
import { VideoItem } from "./VideoItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";
import { VideoId } from "../features/video/types";

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
            <VideoItem
              key={index}
              video={{
                id: (video.id as VideoId).videoId,
                title: video.snippet.title,
                channelId: video.snippet.channelId,
                channelTitle: video.snippet.channelTitle,
                publishedAt: video.snippet.publishedAt,
                imageUrl: video.snippet.thumbnails?.high?.url || "",
              }}
            />
          </Box>
        ))}
    </>
  );
}
