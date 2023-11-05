import { useEffect } from 'react'
import MuiLink from "@mui/material/Link";

export function DownloadLink({videoId}: {videoId: string}) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key === 'd') {
        // The user pressed Ctrl + Alt + D
        // Perform your desired action here
        console.log('Ctrl + Alt + D pressed');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <MuiLink href={`https://www.youtubepi.com/watch?v=${videoId}`} target="_blank" variant="button" >Download More Videos</MuiLink>
  );
}