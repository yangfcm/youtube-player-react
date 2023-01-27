import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { VideoId, VideoSnippet } from "../features/video/types";
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
          <MuiLink
            component={Link}
            to={`/video/${(video.id as VideoId).videoId}`}
            underline="none"
            variant="h5"
            color="inherit"
          >
            <OndemandVideoIcon sx={{ height: "18px" }} color="error" />
            &nbsp;{video.snippet.title}
          </MuiLink>
          <MuiLink
            component={Link}
            to={`/channel/${video.snippet.channelId}`}
            underline="none"
            variant="body2"
            color="text.secondary"
            sx={{ display: "block" }}
          >
            {video.snippet.channelTitle}
          </MuiLink>
          <Typography variant="caption">
            {fromNow(video.snippet.publishedAt)}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
