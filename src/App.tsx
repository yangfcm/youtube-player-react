import { useState } from "react";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import HomeIcon from "@mui/icons-material/Home";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { store } from "./app/store";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const mdTheme = createTheme();

const drawerWidth: number = 240;

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Provider store={store}>
      <ThemeProvider theme={mdTheme}>
        <CssBaseline />
        <Box sx={{ display: " flex" }}>
          <AppBar
            sx={{
              zIndex: {
                md: mdTheme.zIndex.drawer + 1,
              },
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={(e) => {
                  setOpen(true);
                }}
                sx={{
                  marginRight: "36px",
                  display: {
                    xs: "block",
                    sm: "none",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Youtube
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            open={open}
            onClick={() => {
              setOpen(false);
            }}
            sx={{
              display: {
                xs: "block",
                md: "none",
              },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SubscriptionsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Subscriptions" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <Drawer
            variant="permanent"
            open
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            permanent drawer
          </Drawer>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
