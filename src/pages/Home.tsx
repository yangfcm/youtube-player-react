import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useMostPopularVideos } from "../features/video/useMostPopularVideos";
import { VideoCard } from "../components/VideoCard";

export function Home() {
  const { mostPopularVideos, status, error, fetchMore } =
    useMostPopularVideos();

  return (
    <Box>
      <Grid container spacing={2}>
        {mostPopularVideos &&
          mostPopularVideos.map((video) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video.id as string}>
                <VideoCard video={video} />
              </Grid>
            );
          })}
      </Grid>

      <button onClick={fetchMore}>More</button>
    </Box>
  );
}
