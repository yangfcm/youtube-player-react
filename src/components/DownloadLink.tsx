import MuiLink from "@mui/material/Link";

export function DownloadLink({ videoId }: { videoId: string }) {
  return (
    <MuiLink
      href={`https://www.youtubepi.com/watch?v=${videoId}`}
      target="_blank"
      variant="button"
    >
      Download Video
    </MuiLink>
  );
}
