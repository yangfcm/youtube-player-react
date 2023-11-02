import { useState } from 'react';
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
import { RequireAuth } from '../components/RequireAuth';
import { ErrorMessage } from './ErrorMessage';
import { useProfile } from '../features/user/useProfile';
import { VideoInfoResponse } from '../features/video/types';
import { DownloadFileType } from '../features/video/types';
import { useDownloadVideo } from '../features/video/useDownloadVideo';
import { AsyncStatus } from '../settings/types';

export function DownloadFile({ video }: { video: VideoInfoResponse }) {
  const [fileType, setFileType] = useState<DownloadFileType>('video');

  const user = useProfile();
  const { url, isUrlExpired, status, error, downloadVideo } = useDownloadVideo({
    videoId: video.videoId,
    title: video.title,
    userId: user?.id || '',
    filter: fileType,
  });
  const isDownloading = status === AsyncStatus.LOADING;

  return (
    <RequireAuth showLoginButton={false}>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <FormControl>
          <FormLabel>Download as</FormLabel>
          <RadioGroup row defaultValue="video" onChange={e => setFileType(e.target.value as DownloadFileType)}>
            <FormControlLabel value="video" control={<Radio />} label="Video" disabled={isDownloading} />
            <FormControlLabel value="audioonly" control={<Radio />} label="Audio" disabled={isDownloading} />
          </RadioGroup>
        </FormControl>
        {fileType === 'video' &&
          <>
            {url && !isUrlExpired ? <Button
              href={url}
              download
              startIcon={<DownloadIcon />}
              variant="contained"
              size="large"
              color="secondary"
              sx={{ width: '140px' }}
            >
              Download
            </Button> :
              <LoadingButton
                loading={isDownloading}
                onClick={downloadVideo}
                variant="outlined"
                size="large"
                color="secondary"
                startIcon={<VideoFileIcon />}
                sx={{ width: '140px' }}
              >
                Fetch
              </LoadingButton>}
          </>
        }
        {fileType === 'audioonly' &&
          <>
            {url && !isUrlExpired ? <Button
              href={url}
              download
              startIcon={<DownloadIcon />}
              variant="contained"
              size="large"
              color="secondary"
              sx={{ width: '140px' }}
            >
              Download
            </Button> :
              <LoadingButton
                loading={isDownloading}
                onClick={downloadVideo}
                variant="outlined"
                size="large"
                color="secondary"
                startIcon={<AudioFileIcon />}
                sx={{ width: '140px' }}
              >
                Fetch
              </LoadingButton>}
          </>
        }
      </Stack>
    </RequireAuth>
  );
}

