import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useChannelProfile } from "../features/channel/useChannelProfile";
import { formatNumber } from "../app/utils";

function ProfileTitle({ children }: { children: React.ReactNode }){
  return (
    <Typography color={grey[600]} variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
      {children}
    </Typography>
  );
}
function ProfileContent({ children }: { children: React.ReactNode }){
  return (
    <Typography variant="body2">
      {children}
    </Typography>
  );
}

export function ChannelProfile() {
  const { id = ''} = useParams();
  const { channelProfile } = useChannelProfile(id);

  if(!channelProfile) return null;

  return (
    <Box sx={{px: 2, pt: 1, pb: 4}}>
      <ProfileTitle>
        <AccessTimeIcon />&nbsp;Joined on {channelProfile.snippet.publishedAt.toString()}
      </ProfileTitle>
      <ProfileTitle>
        <VideoLibraryIcon />&nbsp;{formatNumber(parseInt(channelProfile.statistics.videoCount))} videos
      </ProfileTitle>
      <ProfileTitle>
        <SubscriptionsIcon />&nbsp;{formatNumber(parseInt(channelProfile.statistics.subscriberCount))} Subscribiers
      </ProfileTitle>
      <ProfileTitle>
        <VisibilityIcon />&nbsp;{formatNumber(parseInt(channelProfile.statistics.viewCount))} Views
      </ProfileTitle>
      <Divider sx={{my: 1}} />
      <ProfileContent>
        {channelProfile.snippet.description}
      </ProfileContent>
    </Box>
  )
}