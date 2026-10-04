import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ViewListIcon from "@mui/icons-material/ViewList";
import { styled } from "@mui/material/styles";
import { useMostPopularVideos } from "../features/video/useMostPopularVideos";
import { VideoCard } from "../components/VideoCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";
import { MoreButton } from "../components/MoreButton";
import { ErrorMessage } from "../components/ErrorMessage";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export function Home() {
  const { mostPopularVideos, status, error, fetchMore, hasMore } =
    useMostPopularVideos();
  if (!mostPopularVideos?.length && status === AsyncStatus.LOADING) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ pb: 2 }}>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Accordion>
        <AccordionSummary id="most-popular-header">
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ThumbUpIcon /> &nbsp;Popular Videos
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} sx={{ pb: 2 }}>
            {mostPopularVideos &&
              mostPopularVideos.map((video) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={video.id as string}
                  >
                    <VideoCard
                      video={{
                        id: video.id as string,
                        title: video.snippet.title,
                        imageUrl: video.snippet.thumbnails.high?.url,
                        channelId: video.snippet.channelId,
                        channelTitle: video.snippet.channelTitle,
                        viewCount: video.statistics.viewCount,
                        publishedAt: video.snippet.publishedAt,
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
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary id="subscriptions-header">
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <SubscriptionsIcon />
            &nbsp; Subscriptions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>subscriptions channels</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary id="playlists-header">
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ViewListIcon /> &nbsp;playlists
          </Typography>
        </AccordionSummary>
        <AccordionDetails>playlists channels</AccordionDetails>
      </Accordion>
    </Box>
  );
}
