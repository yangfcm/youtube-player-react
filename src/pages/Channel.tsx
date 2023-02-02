import { useState } from "react";
import { useParams, useLocation, Outlet, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export function Channel() {
  const { pathname } = useLocation();
  const pathValue = pathname.split("/")[3] || "videos";
  const [value, setValue] = useState(pathValue);
  const { id = "" } = useParams();

  return (
    <Box sx={{ pb: 2 }}>
      Channel page
      <Tabs
        value={value}
        onChange={(event: React.SyntheticEvent, newValue: string) =>
          setValue(newValue)
        }
      >
        <Tab component={Link} to="./videos" label="Videos" value="videos" />
        <Tab
          component={Link}
          to="./playlists"
          label="Playlists"
          value="playlists"
        />
      </Tabs>
      <Outlet />
    </Box>
  );
}
