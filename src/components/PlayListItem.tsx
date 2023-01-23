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
          image={playList.snippet.thumbnails.high?.url}
        />
      </Box>
      <Box>
        <CardContent>
          <Typography component="div" variant="h5">
            <FormatListBulletedIcon sx={{ height: "20px" }} color="secondary" />
            &nbsp;{playList.snippet.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {playList.snippet.channelTitle}
          </Typography>
          <Typography variant="caption">
            {fromNow(playList.snippet.publishedAt)}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
