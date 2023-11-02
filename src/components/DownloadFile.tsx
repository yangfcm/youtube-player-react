import { useState, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import { downloadVideo } from "../app/firebaseServices";
import { RequireAuth } from '../components/RequireAuth';
import { useProfile } from '../features/user/useProfile';
import { VideoInfoResponse } from '../features/video/types';

export function DownloadFile({ video }: { video: VideoInfoResponse }) {
  const [downloadVideoUrl, setDownloadVideoUrl] = useState('');
  const [downloadAudioUrl, setDownloadAudioUrl] = useState('');

  const user = useProfile();

  const handleDownloadClick = useCallback(async (filter: 'video' | 'audioonly') => {
    if(!video || !user) return;
    const url = await downloadVideo({
      videoId: video.videoId,
      title: video.title,
      userId: user.id,
      filter,
    });
    if(filter === 'video') {
      setDownloadVideoUrl(url);
    }
    if(filter === 'audioonly') {
      setDownloadAudioUrl(url);
    }
  }, [video, user]);

  return (
    <RequireAuth showLoginButton={false}>
      <Stack direction="row" alignItems="center" spacing={2}>
        {downloadVideoUrl ? 
          <a href={downloadVideoUrl} download>Download</a> : 
          <button onClick={() => handleDownloadClick('video')}>Fetch Video</button>}
        {downloadAudioUrl ? 
          <a href={downloadAudioUrl} download>Download</a> : 
          <button onClick={() => handleDownloadClick('audioonly')}>Fetch Audio</button>}
      </Stack>
    </RequireAuth>
  );
}

