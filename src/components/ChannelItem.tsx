import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { ChannelSnippet } from "../features/channel/types";

export function ChannelItem({ channel }: { channel: ChannelSnippet }) {
  return (
    <Card
      sx={{
        display: "flex",
        height: {
          sm: 160,
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
              sm: 160,
              xs: "100%",
            },
          }}
          image={channel.snippet.thumbnails.high?.url}
        />
      </Box>
      <Box>
        <CardContent>
          <MuiLink
            component={Link}
            to={`/channel/${channel.id.channelId}`}
            underline="none"
            variant="h6"
            color="inherit"
          >
            <RecentActorsIcon
              sx={{ height: "20px", transform: "translateY(2px)" }}
              color="info"
            />
            &nbsp;
            {channel.snippet.title}
          </MuiLink>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {channel.snippet.description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
