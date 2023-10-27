import { AUDIO_URL } from "../settings/constant"

export function AudioPlayer({ videoId }: { videoId: string }) {
  return (
    <audio controls>
      <source src={`${AUDIO_URL}/${videoId}`} type="audio/mpeg" />
    </audio>
  )
}