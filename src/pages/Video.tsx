import { useParams } from "react-router-dom";
import { useVideo } from "../features/video/useVideo";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";
import { ErrorMessage } from "../components/ErrorMessage";
import { VideoPlayer } from "../components/VideoPlayer";
import { RelevantVideos } from "../components/RelevantVideos";

function NoVideo() {
  return (
    <Box sx={{ display: "d-flex", justifyContent: "center" }}>
      <Alert
        variant="filled"
        severity="error"
        sx={{ justifyContent: "center" }}
      >
        The video isn't available
      </Alert>
    </Box>
  );
}

export function Video() {
  const { id } = useParams();
  const { video, status, error } = useVideo(id);
  console.log(id);
  if (status === AsyncStatus.LOADING) return <LoadingSpinner />;
  if (!id || (!video && status === AsyncStatus.SUCCESS)) {
    return <NoVideo />;
  }
  return (
    <Box>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} xl={9}>
          <VideoPlayer videoId={id} />
        </Grid>
        <Grid item xs={12} sm={4} xl={3}>
          <RelevantVideos />
        </Grid>
      </Grid>
      Video page
    </Box>
  );
}
