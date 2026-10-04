import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export function PageLoading() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <LinearProgress />
    </Box>
  );
}
