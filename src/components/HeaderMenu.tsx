import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { RequireAuth } from "./RequireAuth";
import { useProfile } from "../features/user/useProfile";
import { GoogleLogout } from "./GoogleLogout";
import { AppearanceSwitch } from "./AppearanceSwitch";
import { GoogleLogin } from "./GoogleLogin";

export function HeaderMenu() {
  const profile = useProfile();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <RequireAuth unAuthedComponent={<GoogleLogin />}>
      {profile && (
        <Tooltip title="">
          <IconButton size="small" onClick={handleOpen}>
            <Avatar sx={{ width: 40, height: 40 }} src={profile.avatar} />
          </IconButton>
        </Tooltip>
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {profile && (
          <MenuItem>
            <Avatar sx={{ width: 40, height: 40 }} src={profile.avatar} />{" "}
            {profile.username}
          </MenuItem>
        )}
        <Divider />
        <MenuItem>
          <AppearanceSwitch />
        </MenuItem>
        <MenuItem>
          <GoogleLogout />
        </MenuItem>
      </Menu>
    </RequireAuth>
  );
}
