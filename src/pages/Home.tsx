import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useMostPopularVideos } from "../features/video/useMostPopularVideos";
import { VideoCard } from "../components/VideoCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";
import { MoreButton } from "../components/MoreButton";

export function Home() {
  const { mostPopularVideos, status, error, fetchMore, hasMore } =
    useMostPopularVideos();

  if (!mostPopularVideos?.length && status === AsyncStatus.LOADING) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ pb: 2 }}>
      <Grid container spacing={2} sx={{ pb: 2 }}>
        {mostPopularVideos &&
          mostPopularVideos.map((video) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video.id as string}>
                <VideoCard video={video} />
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
