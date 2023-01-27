import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { fromNow } from "../app/utils";
import { PlayListSnippet } from "../features/playlist/types";

export function PlayListItem({ playList }: { playList: PlayListSnippet }) {
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
          image={playList.snippet.thumbnails.high?.url}
        />
      </Box>
      <Box>
        <CardContent>
          <MuiLink
            component={Link}
            to={`/playlist/${playList.id.playlistId}`}
            underline="none"
            color="inherit"
            variant="h6"
          >
            <FormatListBulletedIcon
              sx={{ height: "20px", transform: "translateY(2px)" }}
              color="secondary"
            />
            &nbsp;{playList.snippet.title}
          </MuiLink>
          <MuiLink
            component={Link}
            to={`/channel/${playList.snippet.channelId}`}
            underline="none"
            variant="body2"
            color="text.secondary"
            sx={{ display: "block" }}
          >
            {playList.snippet.channelTitle}
          </MuiLink>
          <Typography variant="caption">
            {fromNow(playList.snippet.publishedAt)}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
