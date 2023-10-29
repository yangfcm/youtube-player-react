import { SERVER_URL } from "../settings/constant"

export function AudioPlayer({ videoId }: { videoId: string }) {
  return (
    <audio controls>
      <source src={`${SERVER_URL}/audio/${videoId}`} type="audio/mpeg" />
    </audio>
  )
}