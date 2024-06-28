import { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleAuthContext } from "./GoogleAuthProvider";

export function GoogleLogin() {
  const context = useContext(GoogleAuthContext);

  const handleLogin = () => {
    if (!context) return;
    context.client.requestAccessToken();
  };

  return (
    <Button variant="outlined" color="inherit" onClick={handleLogin}>
      <GoogleIcon />
      &nbsp;{" "}
      <Box sx={{ display: { xs: "none", sm: "inline-block" } }}>Login</Box>
    </Button>
  );
}
