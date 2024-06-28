import { useState } from "react";
import { useParams, useLocation, Outlet, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useChannelProfile } from "../features/channel/useChannelProfile";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";
import { ErrorMessage } from "../components/ErrorMessage";
import { NoContent } from "../components/NoContent";
import { ChannelItem } from "../components/ChannelItem";
import { ChannelBanner, bannerHeight } from "../components/ChannelBanner";

export default function Channel() {
  const { pathname } = useLocation();
  const pathValue = pathname.split("/")[3] || "videos";
  const [value, setValue] = useState(pathValue);
  const { id = "" } = useParams();
  const { channelProfile, status, error } = useChannelProfile(id);

  if (status === AsyncStatus.IDLE) return null;
  if (status === AsyncStatus.LOADING && !channelProfile)
    return <LoadingSpinner />;
  if (status === AsyncStatus.SUCCESS && !channelProfile)
    return <NoContent>Channel is unavailable</NoContent>;

  const bannerImageUrl =
    channelProfile?.brandingSettings?.image?.bannerExternalUrl;

  return (
    <Box sx={{ pb: 2 }}>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      {bannerImageUrl && <ChannelBanner imageUrl={bannerImageUrl} />}
      <Box
        sx={{
          transform: {
            sm: bannerImageUrl ? `translateY(${bannerHeight})` : "",
            xs: "",
          },
        }}
      >
        {channelProfile && (
          <>
            <ChannelItem
              channel={{
                id,
                title: channelProfile.snippet.title,
                imageUrl: channelProfile.snippet.thumbnails.medium?.url,
                // description: channelProfile.snippet.description,
              }}
            />
          </>
        )}
        <Tabs
          value={value}
          onChange={(event: React.SyntheticEvent, newValue: string) =>
            setValue(newValue)
          }
        >
          <Tab component={Link} to="./videos" label="Videos" value="videos" />
          <Tab
            component={Link}
            to="./playlists"
            label="Playlists"
            value="playlists"
          />
          <Tab component={Link} to="./about" label="About" value="about" />
        </Tabs>
        <Outlet />
      </Box>
    </Box>
  );
}
