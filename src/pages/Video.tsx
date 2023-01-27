import { useParams } from "react-router-dom";
import { useVideo } from "../features/video/useVideo";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";
import { ErrorMessage } from "../components/ErrorMessage";

function NoVideo() {
  return (
    <Box sx={{ display: "d-flex", justifyContent: "center" }}>
      <Alert
        variant="filled"
        severity="error"
        sx={{ justifyContent: "center" }}
      >
        The video isn't available
      </Alert>
    </Box>
  );
}

export function Video() {
  const { id } = useParams();
  const { video, status, error } = useVideo(id);
  console.log(id);
  if (status === AsyncStatus.LOADING) return <LoadingSpinner />;
  if (!video && status === AsyncStatus.SUCCESS) {
    return <NoVideo />;
  }
  return (
    <Box>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      Video page
    </Box>
  );
}
