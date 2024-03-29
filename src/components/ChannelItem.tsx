import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import placeholder from "../images/placeholder-channel.jpg";
import { SubscribeButton } from "./SubscribeButton";

type ChannelPropsType = {
  id: string;
  title: string;
  imageUrl?: string;
  description?: string;
};

export function ChannelItem({ channel }: { channel: ChannelPropsType }) {
  const { id, title, imageUrl, description } = channel;
  return (
    <Card
      sx={{
        display: "flex",
        height: {
          sm: 165,
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
              xs: "50%",
            },
          }}
          image={imageUrl || placeholder}
        />
      </Box>
      <Box>
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={1}
            sx={{ mb: 1 }}
          >
            {id ? (
              <MuiLink
                component={Link}
                to={`/channel/${id}`}
                underline="none"
                variant="h6"
                color="inherit"
              >
                <RecentActorsIcon
                  sx={{ height: "20px", transform: "translateY(2px)" }}
                  color="info"
                />
                &nbsp;
                {title}
              </MuiLink>
            ) : (
              <Typography variant="h5" color="inherit">
                {title}
              </Typography>
            )}
            {id && <SubscribeButton channelId={id} />}
          </Stack>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
