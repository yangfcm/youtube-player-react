import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { SidebarMenu } from "./SidebarMenu";
import { SIDEBAR_WIDTH, SMALL_SIDEBAR_WIDTH } from "../settings/constant";
import { useToggleSidebar } from "../features/setting/useToggleSidebar";

export function Sidebar() {
  const { openSidebar: open, setOpenSidebar: setOpen } = useToggleSidebar();
  return (
    <>
      <Drawer // Sidebar on small screen.
        open={open}
        onClick={() => {
          setOpen(false);
        }}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: SIDEBAR_WIDTH,
          },
        }}
      >
        <SidebarMenu />
      </Drawer>
      <Drawer // Sidebar on large screen.
        variant="permanent"
        open
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { lg: SIDEBAR_WIDTH, sm: SMALL_SIDEBAR_WIDTH },
          },
          width: { lg: SIDEBAR_WIDTH, sm: SMALL_SIDEBAR_WIDTH },
        }}
      >
        <Toolbar />
        <SidebarMenu />
      </Drawer>
    </>
  );
}
