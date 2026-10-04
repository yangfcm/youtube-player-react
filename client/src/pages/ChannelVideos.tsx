import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useChannelVideos } from "../features/channel/useChannelVideos";
import { VideoCard } from "../components/VideoCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";
import { MoreButton } from "../components/MoreButton";
import { ErrorMessage } from "../components/ErrorMessage";
import { VideoId } from "../features/video/types";
import { NoContent } from "../components/NoContent";

export default function ChannelVideos() {
  const { id = "" } = useParams();
  const {
    channelVideos = [],
    status,
    error,
    fetchMore,
    hasMore,
  } = useChannelVideos(id);

  if (status === AsyncStatus.IDLE) return null;
  if (status === AsyncStatus.LOADING && channelVideos.length === 0)
    return <LoadingSpinner />;
  if (status === AsyncStatus.SUCCESS && channelVideos.length === 0)
    return <NoContent>There is no video in the channel.</NoContent>;

  return (
    <Box sx={{ py: 2 }}>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Grid container spacing={2} sx={{ pb: 2 }}>
        {channelVideos.map((video, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <VideoCard
                video={{
                  id: (video.id as VideoId).videoId,
                  title: video.snippet.title,
                  imageUrl: video.snippet.thumbnails.high?.url,
                  channelId: video.snippet.channelId,
                  channelTitle: video.snippet.channelTitle,
                  publishedAt: video.snippet.publishedAt,
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
