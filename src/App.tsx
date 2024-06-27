import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { store } from "./app/store";
import { Router } from "./Router";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { AppThemeProvider } from "./components/AppThemeProvider";
import { GoogleAuthProvider } from "./components/GoogleAuthProvider";
import { RegionProvider } from "./components/RegionProvider";
import { BottomNav } from "./components/BottomNav";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppThemeProvider>
          <GoogleAuthProvider>
            <RegionProvider>
              <Header />
              <Box
                id="app__main-container"
                sx={{ display: " flex", height: "100vh" }}
              >
                <Sidebar />
                <Box id="app__main" component="main" sx={{ flexGrow: 1 }}>
                  <Toolbar />
                  <Box
                    id="app__position-anchor"
                    sx={{
                      position: "relative",
                      minHeight: "100vh",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box id="app__router-container" sx={{ p: 2, flexGrow: 1 }}>
                      <Router />
                    </Box>
                    <Box
                      id="app__bottom-nav"
                      sx={{ position: "sticky", bottom: 0 }}
                    >
                      <BottomNav />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </RegionProvider>
          </GoogleAuthProvider>
        </AppThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
