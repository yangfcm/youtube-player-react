import { useEffect, useState } from 'react';
import MuiLink from "@mui/material/Link";

export function DownloadLink({videoId}: {videoId: string}) {
  const [code, setCode] = useState('');
  const [showLink, setShowLink] = useState(false);
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      setCode(code + event.key);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [code]);

  useEffect(() => {
    if(code.includes(process.env.REACT_APP_DOWNLOAD_LINK_TRIGGER_CODE as string)){
      setShowLink(true);
    }
  }, [code]);

  if(!showLink) return null;
  return (
    <MuiLink href={`https://www.youtubepi.com/watch?v=${videoId}`} target="_blank" variant="button" >More download options</MuiLink>
  );
}