import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MenuIcon from "@mui/icons-material/Menu";
import { useToggleSidebar } from "../features/setting/useToggleSidebar";
import { HeaderMenu } from "./HeaderMenu";
import { SearchBar } from "./SearchBar";
import { HEADER_HEIGHT } from "../settings/constant";

export function Header() {
  const theme = useTheme();
  const { setOpenSidebar } = useToggleSidebar();

  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        flexDirection: "row",
        height: HEADER_HEIGHT,
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        zIndex: {
          sm: theme.zIndex.drawer + 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={(e) => {
            setOpenSidebar(true);
          }}
          sx={{
            display: {
              xs: "inline-flex",
              sm: "none",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <MuiLink component={Link} to="/" underline="none">
          <Typography
            component="h1"
            variant="h6"
            color="white"
            noWrap
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <YouTubeIcon />
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "inline-flex",
                },
                ml: 1,
              }}
            >
              LiteTube
            </Box>
          </Typography>
        </MuiLink>
      </Box>
      <Box sx={{ flexGrow: 1, mx: 1, maxWidth: "500px" }}>
        <SearchBar />
      </Box>
      <HeaderMenu />
    </AppBar>
  );
}
