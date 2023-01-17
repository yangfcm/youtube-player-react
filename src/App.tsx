import { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { store } from "./app/store";
import { SidebarMenu } from "./components/SidebarMenu";
import { Router } from "./Router";

const mdTheme = createTheme();

const drawerWidth: number = 220;

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={mdTheme}>
          <CssBaseline />
          <Box sx={{ display: " flex", height: "100vh" }}>
            <AppBar
              position="fixed"
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
                    display: {
                      xs: "inline-flex",
                      md: "none",
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
              <SidebarMenu />
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
                width: drawerWidth,
              }}
            >
              <Toolbar />
              <SidebarMenu />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
              <Toolbar />
              <Router />
            </Box>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
