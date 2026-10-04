import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export function LoadingSpinner() {
  return (
    <Box sx={{ display: "flex", py: 2, justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
}
