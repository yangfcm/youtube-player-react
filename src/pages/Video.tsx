import { useParams, useLocation, Link } from "react-router-dom";
import { useVideo } from "../features/video/useVideo";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";
import { ErrorMessage } from "../components/ErrorMessage";
import { VideoPlayer } from "../components/VideoPlayer";
import { VideoComments } from "../components/VideoComments";
import { RelevantVideos } from "../components/RelevantVideos";
import { PlayListVideos } from "../components/PlayListVideos";
import { formatNumber, fromNow, getSearchString } from "../app/utils";
import { NoContent } from "../components/NoContent";

export function Video() {
  const { id = "" } = useParams();
  const location = useLocation();
  const playlistId = getSearchString(location.search, "playlistId");

  const { video, status, error } = useVideo(id);
  if (status === AsyncStatus.IDLE) return null;
  if (status === AsyncStatus.LOADING) return <LoadingSpinner />;
  if (!video) {
    return <NoContent>The video isn't available.</NoContent>;
  }
  return (
    <Box>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7} xl={8}>
          <VideoPlayer videoId={id} />
          <Typography variant="h4" color="primary">
            {video.snippet.title}
          </Typography>
          <MuiLink
            component={Link}
            to={`/channel/${video.snippet.channelId}`}
            underline="hover"
            variant="body1"
          >
            {video.snippet.channelTitle}
          </MuiLink>
          <Typography variant="body1" sx={{ my: 1 }}>
            {formatNumber(parseInt(video.statistics.viewCount)) + " views"} •{" "}
            {fromNow(video.snippet.publishedAt)}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">{video.snippet.description}</Typography>
          <VideoComments videoId={id} />
        </Grid>
        <Grid item xs={12} lg={5} xl={4}>
          {playlistId ? (
            <PlayListVideos playlistId={playlistId} />
          ) : (
            <RelevantVideos videoId={id} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
