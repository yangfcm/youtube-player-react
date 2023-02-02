import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { fromNow } from "../app/utils";
import placeholder from "../images/placeholder-item.jpg";

type PlaylistPropsType = {
  id: string;
  title: string;
  imageUrl?: string;
  channelId?: string;
  channelTitle?: string;
  publishedAt?: Date;
};

export function PlayListItem({ playlist }: { playlist: PlaylistPropsType }) {
  const { id, title, imageUrl, channelId, channelTitle, publishedAt } =
    playlist;
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
              sm: 200,
              xs: "100%",
            },
          }}
          image={imageUrl || placeholder}
        />
      </Box>
      <Box>
        <CardContent>
          <MuiLink
            component={Link}
            to={`/playlist/${id}`}
            underline="none"
            color="inherit"
            variant="h6"
          >
            <FormatListBulletedIcon
              sx={{ height: "20px", transform: "translateY(2px)" }}
              color="secondary"
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
                <Typography variant="body2" color="text.secondary">
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
