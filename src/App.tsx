import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Box from "@mui/material/Box";
import { store } from "./app/store";
import { Router } from "./Router";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { AppThemeProvider } from "./components/AppThemeProvider";
import { GoogleAuthProvider } from "./components/GoogleAuthProvider";
import { RegionProvider } from "./components/RegionProvider";
import { BottomNav } from "./components/BottomNav";
import { HEADER_HEIGHT } from "./settings/constant";
import { PageLoading } from "./components/PageLoading";
import { Suspense } from "react";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppThemeProvider>
          <GoogleAuthProvider>
            <RegionProvider>
              <Header />
              <Box id="app__main-container" sx={{ display: " flex" }}>
                <Sidebar />
                <Box
                  id="app__position-anchor"
                  sx={{
                    flexGrow: 1,
                    position: "relative",
                    paddingTop: HEADER_HEIGHT,
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Suspense fallback={<PageLoading />}>
                    <Box
                      id="app__router-container"
                      sx={{ p: { xs: 1, md: 2 }, flexGrow: 1 }}
                    >
                      <Router />
                    </Box>
                  </Suspense>
                  <Box
                    id="app__bottom-nav"
                    sx={{ position: "sticky", bottom: 0 }}
                  >
                    <BottomNav />
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
