import { useState } from "react";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import HomeIcon from "@mui/icons-material/Home";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { store } from "./app/store";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const mdTheme = createTheme();

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Provider store={store}>
      <ThemeProvider theme={mdTheme}>
        <CssBaseline />
        <Box sx={{ display: " flex" }}>
          <MuiAppBar>
            <Toolbar sx={{ pr: "24px" }}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={(e) => {
                  setOpen(true);
                }}
                sx={{
                  marginRight: "36px",
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
          </MuiAppBar>
          <MuiDrawer
            open={open}
            onClick={() => {
              setOpen(false);
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
          </MuiDrawer>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
