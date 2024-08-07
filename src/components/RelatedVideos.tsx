import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { VideoCard } from "./VideoCard";
import { RelatedVideo } from "../features/video/types";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

export function RelatedVideos({
  videos: videosProp,
}: {
  videos: RelatedVideo[];
}) {
  const videos = videosProp.length > 12 ? videosProp.slice(0, 12) : videosProp;

  if (videos.length === 0) {
    return null;
  }

  return (
    <Accordion>
      <AccordionSummary
        id="related-videos-header"
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
          <VideoLibraryIcon />
          &nbsp;&nbsp;Related Videos
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {videos.map((video) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                key={video.videoId}
              >
                <VideoCard
                  video={{
                    id: video.videoId,
                    title: video.title,
                    imageUrl: video.thumbnail,
                    channelId: video.channelId,
                    channelTitle: video.channelTitle,
                    viewCount: video.viewCount,
                    publishedAt: video.publishedAt,
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
