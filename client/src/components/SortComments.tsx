import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SortIcon from "@mui/icons-material/Sort";
import Tooltip from "@mui/material/Tooltip";
import { CommentOrder } from "../features/comment/types";

export function SortComments({
  disabled = false,
  order = "relevance",
  onChangeOrder,
}: {
  disabled?: boolean;
  order?: CommentOrder;
  onChangeOrder?: (order: CommentOrder) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="Sort comments">
        <span>
          <Button
            startIcon={<SortIcon />}
            color="inherit"
            disabled={disabled}
            onClick={handleOpen}
          >
            Sort by
          </Button>
        </span>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem
          selected={order === "relevance"}
          onClick={() => onChangeOrder && onChangeOrder("relevance")}
        >
          Top comments
        </MenuItem>
        <MenuItem
          selected={order === "time"}
          onClick={() => onChangeOrder && onChangeOrder("time")}
        >
          Newest first
        </MenuItem>
      </Menu>
    </>
  );
}
