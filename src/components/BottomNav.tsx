import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ViewListIcon from "@mui/icons-material/ViewList";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";

const TAB_STYLE = {
  fontSize: "12px",
  padding: 0,
  minWidth: "auto",
  minHeight: "60px",
};

export function BottomNav() {
  const { pathname } = useLocation();
  const [value, setValue] = useState(pathname);

  useEffect(() => {
    setValue(pathname);
  }, [pathname]);

  return (
    <Box
      sx={{
        display: {
          xs: "block",
          sm: "none",
        },
        p: 0,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Tabs value={value} variant="fullWidth" centered>
        <Tab
          component={Link}
          to="/"
          label="Home"
          icon={<HomeIcon />}
          value="/"
          sx={TAB_STYLE}
        />
        <Tab
          component={Link}
          to="/subscriptions"
          label="Channels"
          icon={<SubscriptionsIcon />}
          value="/subscriptions"
          sx={TAB_STYLE}
        />
        <Tab
          component={Link}
          to="/playlists"
          label="Play List"
          icon={<ViewListIcon />}
          value="/playlists"
          sx={TAB_STYLE}
        />
        <Tab
          component={Link}
          to="/explore"
          label="Explore"
          icon={<ExploreIcon />}
          value="/explore"
          sx={TAB_STYLE}
        />
      </Tabs>
    </Box>
  );
}
