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
import { RelatedVideos } from '../components/RelatedVideos';

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
            {video.title}
          </Typography>
          <MuiLink
            component={Link}
            to={`/channel/${video.channelId}`}
            underline="hover"
            variant="body1"
          >
            {video.channelTitle}
          </MuiLink>
          <Typography variant="body1" sx={{ my: 1 }}>
            {formatNumber(parseInt(video.viewCount)) + " views"} •{" "}
            {fromNow(video.publishedAt)}
          </Typography>
          <button onClick={handleDownloadClick}>Fetch</button>
          {downloadUrl && <a href={downloadUrl} download>Download</a>}
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">{video.description}</Typography>
          <Box sx={{my: 2}}>
            {playlistId ? <PlayListVideos playlistId={playlistId} /> : <RelatedVideos videos={video.relatedVideos} />}
          </Box>
          <VideoComments videoId={id} />
        </Grid>
      </Grid>
    </Box>
  );
}
