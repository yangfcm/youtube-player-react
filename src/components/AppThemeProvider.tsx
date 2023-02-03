import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const mdTheme = createTheme({
    palette: {
      // mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
