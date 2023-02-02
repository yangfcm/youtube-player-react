import { useParams, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { usePlaylistVideos } from "../features/playlist/usePlaylistVideos";

export function PlayListVideos() {
  const { id } = useParams();
  const { playlistVideos, status, error } = usePlaylistVideos(id || "");

  return <>play list videos - {id}</>;
}
