import { useMemo } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useVideo } from "../features/video/useVideo";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { AsyncStatus } from "../settings/types";
import { ErrorMessage } from "../components/ErrorMessage";
import { VideoPlayer } from "../components/VideoPlayer";
import { VideoComments } from "../components/VideoComments";
import { PlayListVideos } from "../components/PlayListVideos";
import { formatNumber, fromNow, getSearchString } from "../app/utils";
import { NoContent } from "../components/NoContent";
import { RelatedVideos } from "../components/RelatedVideos";
import { DownloadLink } from "../components/DownloadLink";
import { VideoDataLoader } from "../components/VideoDataLoader";
import { RequireAuth } from "../components/RequireAuth";

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
    if (!video?.snippet.description) return "";

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = video.snippet.description.split(
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
  }, [video?.snippet.description]);

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
            {video.snippet.title}
            &nbsp;
            <RequireAuth>
              <DownloadLink videoId={video.id as string}></DownloadLink>
            </RequireAuth>
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Box sx={{ flexGrow: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <MuiLink
                  component={Link}
                  to={`/channel/${video.snippet.channelId}`}
                  underline="hover"
                  variant="body1"
                >
                  {video.snippet.channelTitle}
                </MuiLink>
              </Stack>
              <Typography variant="body1" sx={{ my: 1 }}>
                {formatNumber(parseInt(video.statistics.viewCount)) + " views"}{" "}
                • {fromNow(video.snippet.publishedAt)}
              </Typography>
            </Box>
          </Stack>
          {video.snippet.description && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2">{videoDescription}</Typography>
              <Divider sx={{ my: 1 }} />
            </>
          )}
          <Box sx={{ my: 2 }}>
            {playlistId ? (
              <Accordion>
                <AccordionSummary
                  id="playlist-accordion"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography
                    variant="h5"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <OndemandVideoIcon />
                    &nbsp;&nbsp;Videos in Playlist
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <PlayListVideos playlistId={playlistId} />
                </AccordionDetails>
              </Accordion>
            ) : (
              <RelatedVideos videos={[]} />
            )}
          </Box>
          <VideoComments videoId={id} />
        </Grid>
      </Grid>
    </Box>
  );
}
