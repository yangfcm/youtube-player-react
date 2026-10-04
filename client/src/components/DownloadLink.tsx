import MuiLink from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export function DownloadLink({ videoId }: { videoId: string }) {
  return (
    <>
      <MuiLink
        href={`https://www.youtubepi.com/watch?v=${videoId}`}
        target="_blank"
        variant="button"
      >
        <OpenInNewIcon sx={{ height: "15px", transform: "translateY(2px)" }} />
        Download
      </MuiLink>
    </>
  );
}
