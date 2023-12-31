import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from "../features/user/useAuth";

export function GoogleLogout() {
  const { signout } = useAuth();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    signout();
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
