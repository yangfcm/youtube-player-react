import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { VideoCard } from './VideoCard';
import { RelatedVideo } from '../features/video/types';

export function RelatedVideos({ videos }: { videos: RelatedVideo[] }) {
  return (
    <>
      <Typography variant="h5">Related Videos</Typography>
      <Grid container spacing={2}>
        {videos.map((video) => {
          return (            
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={video.videoId}>
              <VideoCard
                video={{
                  id: video.videoId,
                  title: video.title,
                  imageUrl: video.thumbnail,
                  channelId: video.channelId,
                  channelTitle: video.channelTitle,
                  viewCount: video.viewCount,
                  publishedAt: video.publishedAt,
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  )
}