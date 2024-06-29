import { useMemo } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useVideo } from "../features/video/useVideo";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { AsyncStatus } from "../settings/types";
import { ErrorMessage } from "../components/ErrorMessage";
import { VideoPlayer } from "../components/VideoPlayer";
import { VideoComments } from "../components/VideoComments";
import { PlayListVideos } from "../components/PlayListVideos";
import {
  formatNumber,
  fromNow,
  getSearchString,
  formatLengthFromSeconds,
} from "../app/utils";
import { NoContent } from "../components/NoContent";
import { RelatedVideos } from "../components/RelatedVideos";
import { DownloadFile } from "../components/DownloadFile";
import { VideoDataLoader } from "../components/VideoDataLoader";

export default function Video() {
  const { id = "" } = useParams();

  if (!id) {
    return <NoContent>The video isn't available.</NoContent>;
  }

  return (
    <Box>
      <VideoPlayer videoId={id} />
      <VideoDataSection />
    </Box>
  );
}

const shortenUrl = (url: string, maxLength = 30) => {
  return url.length > maxLength ? url.substring(0, maxLength) + "..." : url;
};

export function VideoDataSection() {
  const { id = "" } = useParams();
  const location = useLocation();
  const playlistId = getSearchString(location.search, "playlistId");
  const { video, status, error } = useVideo(id);

  const videoDescription = useMemo(() => {
    if (!video?.description) return "";

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = video.description.split(
      new RegExp(`(${urlRegex.source}|\\n)`, "g")
    );

    const processedText = parts.map((part, index) => {
      if (urlRegex.test(part)) {
        // Replace text with 'http://' with a clickable link.
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            title={part}
          >
            {shortenUrl(part)}
          </a>
        );
      } else if (part === "\n") {
        // Replace \n with breakline.
        return <br key={index} />;
      } else {
        // For others, show as it is.
        if (urlRegex.test(part)) return ""; // Not sure why link appears here again, so I want to get rid of it.
        return part;
      }
    });

    return processedText;
  }, [video?.description]);

  if (status === AsyncStatus.IDLE) return null;
  if (status === AsyncStatus.LOADING) return <VideoDataLoader />;
  if (!video) {
    return <NoContent>The video isn't available.</NoContent>;
  }
  return (
    <Box>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
            {video.title}
            &nbsp;
            <Chip
              label={formatLengthFromSeconds(video.lengthSeconds)}
              variant="outlined"
              icon={<AccessTimeIcon />}
              size="small"
            />
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Box sx={{ flexGrow: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar
                  sx={{ width: 40, height: 40 }}
                  src={video.channelThumbnail}
                />
                <MuiLink
                  component={Link}
                  to={`/channel/${video.channelId}`}
                  underline="hover"
                  variant="body1"
                >
                  {video.channelTitle}
                </MuiLink>
              </Stack>
              <Typography variant="body1" sx={{ my: 1 }}>
                {formatNumber(parseInt(video.viewCount)) + " views"} •{" "}
                {fromNow(video.publishedAt)}
              </Typography>
            </Box>
          </Stack>
          {video.description && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2">{videoDescription}</Typography>
              <Divider sx={{ my: 1 }} />
            </>
          )}
          <Box>
            <DownloadFile video={video} />
          </Box>
          <Box sx={{ my: 2 }}>
            {playlistId ? (
              <PlayListVideos playlistId={playlistId} />
            ) : (
              <RelatedVideos videos={video.relatedVideos} />
            )}
          </Box>
          <VideoComments videoId={id} />
        </Grid>
      </Grid>
    </Box>
  );
}
