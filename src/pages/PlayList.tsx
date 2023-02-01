import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { RequireAuth } from "../components/RequireAuth";

export function PlayList() {
  return (
    <RequireAuth>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Play List
      </Typography>
    </RequireAuth>
  );
}
