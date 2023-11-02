import { useState, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import DownloadIcon from '@mui/icons-material/Download';
import { downloadVideo } from "../app/firebaseServices";
import { RequireAuth } from '../components/RequireAuth';
import { useProfile } from '../features/user/useProfile';
import { VideoInfoResponse } from '../features/video/types';

export function DownloadFile({ video }: { video: VideoInfoResponse }) {
  const [downloadVideoUrl, setDownloadVideoUrl] = useState('');
  const [downloadAudioUrl, setDownloadAudioUrl] = useState('');
  const [downloadingVideo, setDownloadingVideo] = useState(false);
  const [downloadingAudio, setDownloadingAudio] = useState(false);

  const user = useProfile();

  const handleDownloadClick = useCallback(async (filter: 'video' | 'audioonly') => {
    if (!video || !user) return;
    if (filter === 'video') {
      setDownloadingVideo(true);
    }
    if (filter === 'audioonly') {
      setDownloadingAudio(true);
    }
    const url = await downloadVideo({
      videoId: video.videoId,
      title: video.title,
      userId: user.id,
      filter,
    });
    if (filter === 'video') {
      setDownloadVideoUrl(url);
    }
    if (filter === 'audioonly') {
      setDownloadAudioUrl(url);
    }
  }, [video, user]);

  return (
    <RequireAuth showLoginButton={false}>
      <Stack direction="row" alignItems="center" spacing={1}>
        {downloadVideoUrl ?
          <Button
            href={downloadVideoUrl}
            download
            startIcon={<DownloadIcon />}
            variant="contained"
            size="small"
            color="secondary"
          >
            Download Video
          </Button> :
          <LoadingButton
            loading={downloadingVideo}
            onClick={() => handleDownloadClick('video')}
            variant="outlined"
            size="small"
            color="secondary"
            startIcon={<VideoFileIcon />}
          >
            Fetch Video
          </LoadingButton>}
        {downloadAudioUrl ?
          <Button
            href={downloadAudioUrl}
            download
            startIcon={<DownloadIcon />}
            variant="contained"
            size="small"
            color="secondary"
          >
            Download Audio
          </Button> :
          <LoadingButton
            loading={downloadingAudio}
            onClick={() => handleDownloadClick('audioonly')}
            variant="outlined"
            size="small"
            color="secondary"
            startIcon={<AudioFileIcon />}
          >
            Fetch Audio
          </LoadingButton>}
      </Stack>
    </RequireAuth>
  );
}

