import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
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
import { CircularPercentProgress } from './CircularPercentProgress';
import { ErrorMessage } from './ErrorMessage';
import { useProfile } from '../features/user/useProfile';
import { VideoInfoResponse } from '../features/video/types';
import { DownloadFileType } from '../features/video/types';
import { useDownloadVideo } from '../features/video/useDownloadVideo';
import { AsyncStatus } from '../settings/types';
import { DownloadLink } from './DownloadLink';

export function DownloadFile({ video }: { video: VideoInfoResponse }) {
  const [fileType, setFileType] = useState<DownloadFileType>('videoandaudio');

  const user = useProfile();
  const { url, isUrlExpired, status, error, downloadVideo, expiredAt, downloadProgress } = useDownloadVideo({
    videoId: video.videoId,
    title: video.title,
    userId: user?.id || '',
    filter: fileType,
  });
  const isDownloading = status === AsyncStatus.LOADING;
  const checkDownloadable = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Not downloading if link is expired.
    if (Date.now() > (expiredAt || 0) || !url) {
      e.preventDefault();
    }
  }, [expiredAt, url]);

  return (
    <RequireAuth showLoginButton={false}>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FormControl>
            <FormLabel>Download as</FormLabel>
            <RadioGroup row defaultValue="videoandaudio" onChange={e => setFileType(e.target.value as DownloadFileType)}>
              <FormControlLabel value="videoandaudio" control={<Radio />} label="Video" disabled={isDownloading} />
              <FormControlLabel value="audioonly" control={<Radio />} label="Audio" disabled={isDownloading} />
            </RadioGroup>
          </FormControl>
          {fileType === 'videoandaudio' &&
            <>
              {url && !isUrlExpired ? <Button
                href={url}
                download
                startIcon={<DownloadIcon />}
                variant="contained"
                size="large"
                color="secondary"
                sx={{ width: '140px' }}
                onClick={checkDownloadable}
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
                  loadingIndicator={<CircularPercentProgress value={downloadProgress} color="inherit" />}
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
                onClick={checkDownloadable}
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
                  loadingIndicator={<CircularPercentProgress value={downloadProgress} color="inherit" />}
                >
                  Fetch
                </LoadingButton>}
            </>
          }
        </Stack> 
        <DownloadLink videoId={video.videoId} />
      </Box>
    </RequireAuth>
  );
}

