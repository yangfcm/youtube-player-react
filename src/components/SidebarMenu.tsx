import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiLink from "@mui/material/Link";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ViewListIcon from "@mui/icons-material/ViewList";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";

export function SidebarMenu() {
  return (
    <List>
      <MuiLink component={Link} to="/" underline="none">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </MuiLink>
      <MuiLink component={Link} to="/subscriptions" underline="none">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SubscriptionsIcon />
            </ListItemIcon>
            <ListItemText primary="Channels" />
          </ListItemButton>
        </ListItem>
      </MuiLink>
      <MuiLink component={Link} to="/playlists" underline="none">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="Play List" />
          </ListItemButton>
        </ListItem>
      </MuiLink>
      <MuiLink component={Link} to="/explore" underline="none">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Explore" />
          </ListItemButton>
        </ListItem>
      </MuiLink>
    </List>
  );
}
