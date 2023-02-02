import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { fromNow } from "../app/utils";

type VideoPropsType = {
  id: string;
  title: string;
  channelId?: string;
  channelTitle?: string;
  publishedAt?: Date;
  imageUrl: string;
};

export function VideoItem({ video }: { video: VideoPropsType }) {
  const { id, title, channelId, channelTitle, publishedAt, imageUrl } = video;
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
        boxShadow: "none",
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
              sm: "200px",
              xs: "100%",
            },
          }}
          image={imageUrl}
        />
      </Box>
      <Box>
        <CardContent>
          <MuiLink
            component={Link}
            to={`/video/${id}`}
            underline="none"
            variant="h6"
            color="inherit"
            sx={{
              display: "block",
              lineHeight: "23px",
              height: {
                xs: "auto",
                sm: 23 * 3 + "px", // Restrict title to three lines.
              },
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <OndemandVideoIcon
              sx={{ height: "18px", transform: "translateY(2px)" }}
              color="error"
            />
            &nbsp;{title}
          </MuiLink>
          {channelTitle && (
            <>
              {channelId ? (
                <MuiLink
                  component={Link}
                  to={`/channel/${channelId}`}
                  underline="none"
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "block" }}
                >
                  {channelTitle}
                </MuiLink>
              ) : (
                <Typography variant="body2" color="text-secondary">
                  {channelTitle}
                </Typography>
              )}
            </>
          )}
          {publishedAt && (
            <Typography variant="caption">{fromNow(publishedAt)}</Typography>
          )}
        </CardContent>
      </Box>
    </Card>
  );
}
