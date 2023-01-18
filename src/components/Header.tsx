import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { useToggleSidebar } from "../features/setting/useToggleSidebar";
import { HeaderMenu } from "./HeaderMenu";
import { SearchBar } from "./SearchBar";

export function Header() {
  const theme = useTheme();
  const { setOpenSidebar } = useToggleSidebar();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: {
          md: theme.zIndex.drawer + 1,
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={(e) => {
            setOpenSidebar(true);
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
          sx={{
            flexGrow: 1,
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          Youtube
        </Typography>
        <SearchBar />
        <HeaderMenu />
      </Toolbar>
    </AppBar>
  );
}
