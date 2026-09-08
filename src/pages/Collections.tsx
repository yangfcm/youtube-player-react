import { Box, Typography } from "@mui/material";
import { RequireAuth } from "../components/RequireAuth";
import { RequireLoginPage } from "../components/RequireLoginPage";

export default function Collections() {
  return (
    <>
      <RequireAuth unAuthedComponent={<RequireLoginPage />}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          My Collections
        </Typography>
        <Box sx={{ pb: 2 }}>Collections here</Box>
      </RequireAuth>
    </>
  );
}
