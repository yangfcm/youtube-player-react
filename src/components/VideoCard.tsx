import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { fromNow, formatNumber } from "../app/utils";
import placeholder from "../images/placeholder-item.jpg";
import { LazyImage } from "./LazyImage";
import { ActionMenu } from "./ActionMenu";
import { useProfile } from "../features/user/useProfile";
import { useToggleHideTimelineVideo } from "../features/timeline/useToggleHideTimelineVideo";
import { AsyncStatus } from "../settings/types";

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
  canHideVideo = false,
  isActive = true,
}: {
  video: VideoTypeProps;
  playlistId?: string;
  isActive?: boolean;
  canHideVideo?: boolean;
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

  const user = useProfile();
  const { unHideVideo, status: unHideStatus } = useToggleHideTimelineVideo(
    user?.id ?? "",
  );

  return (
    <Card sx={{ position: "relative" }}>
      <Box sx={{ position: "relative" }}>
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
      </Box>
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
            canHideVideo={canHideVideo}
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
      {!isActive && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            bgcolor: "rgba(0, 0, 0, 0.75)",
          }}
        >
          <Typography variant="body2" fontWeight={500} sx={{ color: "#fff" }}>
            Video hidden from feed
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              borderRadius: 999,
              bgcolor: "grey.300",
              color: "#000",
              "&:hover": { bgcolor: "grey.400" },
            }}
            disabled={unHideStatus === AsyncStatus.LOADING}
            onClick={() => unHideVideo(id)}
          >
            Unhide
          </Button>
        </Box>
      )}
    </Card>
  );
}
