import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { VideoSnippet } from "../features/video/types";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { fromNow } from "../app/utils";

export function VideoItem({ video }: { video: VideoSnippet }) {
  return (
    <Card
      sx={{
        display: "flex",
        minHeight: {
          sm: 120,
          xs: "auto",
        },
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        my: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: {
              sm: 200,
              xs: "100%",
            },
          }}
          image={video.snippet.thumbnails.high?.url}
        />
      </Box>
      <Box>
        <CardContent>
          <Typography component="div" variant="h5">
            <OndemandVideoIcon sx={{ height: "20px" }} color="error" />
            &nbsp;{video.snippet.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {video.snippet.channelTitle}
          </Typography>
          <Typography variant="caption">
            {fromNow(video.snippet.publishedAt)}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
