import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { fromNow, formatNumber } from "../app/utils";
import placeholder from "../images/placeholder-item.jpg";
import { LazyImage } from "./LazyImage";

type VideoTypeProps = {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  imageUrl?: string;
  viewCount?: string;
  publishedAt?: Date;
};

export function VideoCard({ video }: { video: VideoTypeProps }) {
  const {
    id,
    title,
    channelId,
    channelTitle,
    viewCount,
    publishedAt,
    imageUrl,
  } = video;
  return (
    <Card>
      <Link to={`/video/${id}`}>
        {imageUrl ? (
          <LazyImage src={imageUrl} style={{ width: "100%", height: "auto" }} />
        ) : (
          <img
            src={placeholder}
            alt="placeholder"
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </Link>
      <CardContent
        sx={{
          px: 1,
          pt: "3px",
        }}
      >
        <MuiLink
          component={Link}
          to={`/video/${id}`}
          underline="none"
          variant="subtitle1"
          title={title}
          sx={{
            display: "block",
            lineHeight: "23px",
            height: {
              xs: "auto",
              sm: "46px",
            },
            overflow: "hidden",
            textOverflow: "ellipsis",
            mb: 1,
          }}
        >
          {title}
        </MuiLink>
        <Box sx={{ mb: "5px" }}>
          <MuiLink
            component={Link}
            to={`/channel/${channelId}`}
            underline="hover"
            variant="body2"
            color="inherit"
          >
            {channelTitle}
          </MuiLink>
        </Box>
        <Typography variant="caption">
          <>
            {viewCount && formatNumber(parseInt(viewCount)) + " views"}{" "}
            {viewCount && publishedAt && "• "}
            {publishedAt && fromNow(publishedAt)}
          </>
        </Typography>
      </CardContent>
    </Card>
  );
}
