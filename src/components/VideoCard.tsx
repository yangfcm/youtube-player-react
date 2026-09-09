import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { fromNow, formatNumber } from "../app/utils";
import placeholder from "../images/placeholder-item.jpg";
import { LazyImage } from "./LazyImage";
import { ActionMenu } from "./ActionMenu";

type VideoTypeProps = {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  imageUrl?: string;
  viewCount?: string;
  publishedAt?: Date | string;
};

export function VideoCard({
  video,
  playlistId,
}: {
  video: VideoTypeProps;
  playlistId?: string;
}) {
  const {
    id,
    title,
    channelId,
    channelTitle,
    viewCount,
    publishedAt,
    imageUrl,
  } = video;

  const link = playlistId
    ? `/video/${id}?playlistId=${playlistId}`
    : `/video/${id}`;

  return (
    <Card>
      <Link to={link}>
        {imageUrl ? (
          <LazyImage
            src={imageUrl}
            style={{ width: "100%", height: "auto" }}
            ratio="3:2"
          />
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
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
          <MuiLink
            component={Link}
            to={link}
            underline="none"
            variant="subtitle1"
            title={title}
            sx={{
              display: {
                xs: "block",
                sm: "-webkit-box",
              },
              flexGrow: 1,
              minWidth: 0,
              lineHeight: "23px",
              WebkitLineClamp: {
                sm: 2,
              },
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </MuiLink>
          <ActionMenu
            item={{
              type: "video",
              itemId: id,
              title,
              imageUrl,
              channelId,
              channelTitle,
            }}
          />
        </Box>
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
