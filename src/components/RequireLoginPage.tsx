import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { GoogleLogin } from "./GoogleLogin";

export function RequireLoginPage() {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ p: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
            Enjoy your favourite videos
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Log in to access videos you've liked or saved on YouTube and more.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", py: 2 }}>
          <GoogleLogin responsive={false} />
        </CardActions>
      </Card>
    </Stack>
  );
}
