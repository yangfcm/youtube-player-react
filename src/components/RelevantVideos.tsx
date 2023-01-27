import { useRelevantVideos } from "../features/search/useRelevantVideos";
export function RelevantVideos({ videoId }: { videoId: string }) {
  const { videos } = useRelevantVideos(videoId);
  return <>Relevant videos</>;
}
