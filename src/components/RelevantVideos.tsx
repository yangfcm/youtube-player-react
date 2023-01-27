import { useRelevantVideos } from "../features/search/useRelevantVideos";
import { VideoItem } from "./VideoItem";

export function RelevantVideos({ videoId }: { videoId: string }) {
  const { videos } = useRelevantVideos(videoId);
  return (
    <>
      {videos &&
        videos.map((video, index) => <VideoItem key={index} video={video} />)}
    </>
  );
}
