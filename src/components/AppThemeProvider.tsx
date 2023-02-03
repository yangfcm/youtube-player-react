import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDarkTheme } from "../features/setting/useDarkTheme";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const { darkTheme, setDarkTheme } = useDarkTheme();

  useEffect(() => {
    setDarkTheme(localStorage.getItem("dark") === "1");
  }, [setDarkTheme]);

  const mdTheme = createTheme({
    palette: {
      mode: darkTheme ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
