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

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppThemeProvider>
          <GoogleAuthProvider>
            <RegionProvider>
              <Box sx={{ display: " flex", height: "100vh" }}>
                <Header />
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                  <Toolbar />
                  <Router />
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
