import { useParams } from "react-router";
import { useChannelVideos } from "../features/channel/useChannelVideos";

export function ChannelVideos() {
  const { id = "" } = useParams();
  const { channelVideos } = useChannelVideos(id);
  return <>channel videos</>;
}
