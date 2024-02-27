import { useContext } from "react";
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
    <Button
      variant="outlined"
      color="inherit"
      startIcon={<GoogleIcon />}
      onClick={handleLogin}
    >
      Login
    </Button>
  );
}
