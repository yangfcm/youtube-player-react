import { FIREBASE_SERVER_URL } from "../settings/constant"

export function AudioPlayer({ videoId }: { videoId: string }) {
  return (
    <audio controls>
      <source src={`${FIREBASE_SERVER_URL}/audio/${videoId}`} type="audio/mpeg" />
    </audio>
  )
}