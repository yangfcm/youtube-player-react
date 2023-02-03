import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDarkTheme } from "../features/setting/useDarkTheme";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const { darkTheme } = useDarkTheme();

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
