import { useState } from 'react';
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
import { PlayListVideos } from "../components/PlayListVideos";
import { formatNumber, fromNow, getSearchString } from "../app/utils";
import { NoContent } from "../components/NoContent";
import { downloadVideo } from "../app/firebaseServices";

export function Video() {
  const [downloadUrl, setDownloadUrl] = useState('');
  const { id = "" } = useParams();
  const location = useLocation();
  const playlistId = getSearchString(location.search, "playlistId");

  const handleDownloadClick = async () => {
    console.log('handle download!');
    const url = await downloadVideo(id);
    setDownloadUrl(url);
    // console.log('get url', url);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'video.mp4'; // You can specify the desired file name
    // a.style.display = 'none';
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  }

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
        <Grid item xs={12}>
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
          <button onClick={handleDownloadClick}>Fetch</button>
          {downloadUrl && <a href={downloadUrl} download>Download</a>}
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">{video.snippet.description}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} my={2}>
        {playlistId ? <>
          <Grid item xs={12} lg={7} xl={8}>
            <VideoComments videoId={id} />
          </Grid>
          <Grid item xs={12} lg={5} xl={4}>
            <PlayListVideos playlistId={playlistId} />
          </Grid>
        </> :
          <Grid item xs={12}>
            <VideoComments videoId={id} />
          </Grid>}
      </Grid>
    </Box>
  );
}
