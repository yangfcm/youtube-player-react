import { useState, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import DownloadIcon from '@mui/icons-material/Download';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { downloadVideo } from "../app/firebaseServices";
import { RequireAuth } from '../components/RequireAuth';
import { useProfile } from '../features/user/useProfile';
import { VideoInfoResponse } from '../features/video/types';
import { DownloadFileType } from '../features/video/types';

export function DownloadFile({ video }: { video: VideoInfoResponse }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadVideoUrl, setDownloadVideoUrl] = useState('');
  const [downloadAudioUrl, setDownloadAudioUrl] = useState('');
  const [fileType, setFileType] = useState<DownloadFileType>('video');
  // const fileTypeName = fileType === 'video' ? 'Video' : fileType === 'audioonly' ? 'Audio' : '';

  const user = useProfile();

  const handleDownloadClick = useCallback(async () => {
    if (!video || !user) return;
    setIsDownloading(true);
    const url = await downloadVideo({
      videoId: video.videoId,
      title: video.title,
      userId: user.id,
      filter: fileType
    });
    if (fileType === 'video') {
      setDownloadVideoUrl(url);
    }
    if (fileType === 'audioonly') {
      setDownloadAudioUrl(url);
    }
    setIsDownloading(false);
  }, [video, user, fileType]);

  return (
    <RequireAuth showLoginButton={false}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <FormControl>
          <FormLabel>Download as</FormLabel>
          <RadioGroup row defaultValue="video" onChange={e => setFileType(e.target.value as DownloadFileType)}>
            <FormControlLabel value="video" control={<Radio />} label="Video" />
            <FormControlLabel value="audioonly" control={<Radio />} label="Audio" />
          </RadioGroup>
        </FormControl>
        {fileType === 'video' &&
          <>
            {downloadVideoUrl ? <Button
              href={downloadVideoUrl}
              download
              startIcon={<DownloadIcon />}
              variant="contained"
              size="large"
              color="secondary"
              sx={{ width: '165px' }}
            >
              Download
            </Button> :
              <LoadingButton
                loading={isDownloading}
                onClick={handleDownloadClick}
                variant="outlined"
                size="large"
                color="secondary"
                startIcon={<VideoFileIcon />}
                sx={{ width: '165px' }}
              >
                Fetch
              </LoadingButton>}
          </>
        }
        {fileType === 'audioonly' &&
          <>
            {downloadAudioUrl ? <Button
              href={downloadAudioUrl}
              download
              startIcon={<DownloadIcon />}
              variant="contained"
              size="large"
              color="secondary"
              sx={{ width: '165px' }}
            >
              Download
            </Button> :
              <LoadingButton
                loading={isDownloading}
                onClick={handleDownloadClick}
                variant="outlined"
                size="large"
                color="secondary"
                startIcon={<AudioFileIcon />}
                sx={{ width: '165px' }}
              >
                Fetch
              </LoadingButton>}
          </>
        }
      </Stack>
    </RequireAuth>
  );
}

