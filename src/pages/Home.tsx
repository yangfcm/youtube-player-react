import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTimeline } from "../features/timeline/useTimeline";
import { VideoCard } from "../components/VideoCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";
import { ErrorMessage } from "../components/ErrorMessage";
import { MoreButton } from "../components/MoreButton";
import { RequireAuth } from "../components/RequireAuth";
import { NoContent } from "../components/NoContent";
import { useProfile } from "../features/user/useProfile";
import { RequireLoginPage } from "../components/RequireLoginPage";

export function Home() {
  // const { mostPopularVideos, status, error, fetchMore, hasMore } =
  //   useMostPopularVideos();
  const user = useProfile();
  const userId = user?.id || "";
  const { videos, status, error, hasMore, fetchMore, meta } =
    useTimeline(userId);
  if (!videos.length && (status === AsyncStatus.LOADING || meta?.loading)) {
    return <LoadingSpinner />;
  }

  return (
    <RequireAuth unAuthedComponent={<RequireLoginPage />}>
      <Box sx={{ pb: 2 }}>
        <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
        {(status === AsyncStatus.SUCCESS || status === AsyncStatus.IDLE) &&
          videos.length === 0 && <NoContent> Your feed is empty.</NoContent>}
        <Grid container spacing={2} sx={{ pb: 2 }}>
          {videos.map((video) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video.id as string}>
                <VideoCard
                  video={{
                    id: video.id as string,
                    title: video.title,
                    imageUrl: video.imageUrl,
                    channelId: video.channelId,
                    channelTitle: video.channelTitle,
                    publishedAt: new Date(video.publishTimestamp),
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
    </RequireAuth>
  );
}
