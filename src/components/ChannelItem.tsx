import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
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
          <Typography component="div" variant="h5">
            {channel.snippet.title}
          </Typography>
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
