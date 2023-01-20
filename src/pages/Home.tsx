import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMostPopularVideos } from "../features/video/useMostPopularVideos";
import { VideoCard } from "../components/VideoCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";

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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton
            loading={status === AsyncStatus.LOADING}
            variant="outlined"
            size="small"
            onClick={fetchMore}
            sx={{
              width: {
                xs: "100%",
                md: "50%",
                lg: "40%",
              },
            }}
          >
            More
          </LoadingButton>
        </Box>
      )}
    </Box>
  );
}
