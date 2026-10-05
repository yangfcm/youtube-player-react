import { useContext } from "react";
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { GoogleAuthContext } from "./GoogleAuthProvider";

export function GoogleLogout() {
  const context = useContext(GoogleAuthContext);

  const handleSignOut = () => {
    context?.signOutUser();
  };

  return (
    <Button
      onClick={handleSignOut}
      color="inherit"
      variant="outlined"
      fullWidth
      startIcon={<ExitToAppIcon />}
    >Log out</Button>
  );
}
