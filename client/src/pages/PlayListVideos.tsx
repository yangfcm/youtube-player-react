import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PlayListVideos as PlayListVideosComp } from "../components/PlayListVideos";

export default function PlayListVideos() {
  const { id = "" } = useParams();

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Playlist Videos
      </Typography>
      <PlayListVideosComp playlistId={id} />
    </Box>
  );
}
