import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { VideoSnippetStats } from "../features/video/types";
import { fromNow, formatNumber } from "../app/utils";

export function VideoCard({ video }: { video: VideoSnippetStats }) {
  return (
    <Card>
      <Link to={`/video/${video.id}`}>
        <img
          src={video.snippet.thumbnails.high?.url}
          alt={video.snippet.title}
          title={video.snippet.title}
          loading="lazy"
          style={{ width: "100%", height: "auto" }}
        />
      </Link>
      <CardActionArea>
        <CardContent
          sx={{
            px: 1,
            pt: "3px",
          }}
        >
          <MuiLink
            component={Link}
            to={`/video/${video.id}`}
            underline="none"
            variant="subtitle1"
            title={video.snippet.title}
            sx={{
              display: "block",
              lineHeight: "23px",
              height: "46px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 1,
            }}
          >
            {video.snippet.title}
          </MuiLink>
          <Box sx={{ mb: "5px" }}>
            <MuiLink
              component={Link}
              to={`/channel/${video.snippet.channelId}`}
              underline="hover"
              variant="body2"
              color="inherit"
            >
              {video.snippet.channelTitle}
            </MuiLink>
          </Box>
          <Typography variant="caption">
            <>
              {formatNumber(parseInt(video.statistics.viewCount)) + " views"} •{" "}
              {fromNow(video.snippet.publishedAt)}
            </>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
