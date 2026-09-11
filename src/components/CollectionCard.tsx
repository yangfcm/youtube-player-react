import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { LazyImage } from "./LazyImage";
import { ConfirmDialog } from "./ConfirmDialog";
import { ErrorMessage } from "./ErrorMessage";
import { CollectionSnippet } from "../features/collection/types";
import { useDeleteCollection } from "../features/collection/useDeleteCollection";
import { AsyncStatus } from "../settings/types";
import placeholder from "../images/placeholder-item.jpg";

export function CollectionCard({
  collection,
}: {
  collection: CollectionSnippet;
}) {
  const { name, thumbnail, totalCount } = collection;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const { deleteCollection, status, error } = useDeleteCollection(
    collection.id,
  );

  useEffect(() => {
    if (status === AsyncStatus.SUCCESS) {
      setConfirmOpen(false);
    }
  }, [status]);

  return (
    <>
      <Card>
        <Link to={collection.id}>
          <LazyImage
            src={thumbnail || placeholder}
            alt={name}
            title={name}
            style={{ width: "100%", height: "auto" }}
            ratio="3:2"
          />
        </Link>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
            <MuiLink
              component={Link}
              to={collection.id}
              underline="none"
              variant="subtitle1"
              sx={{
                display: {
                  xs: "block",
                  sm: "-webkit-box",
                },
                flexGrow: 1,
                minWidth: 0,
                lineHeight: "23px",
                WebkitLineClamp: {
                  sm: 2,
                },
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </MuiLink>
            <IconButton
              aria-label="Video options"
              size="small"
              sx={{
                "&:hover": {
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.2)",
                },
              }}
              onClick={handleOpenMenu}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleCloseMenu}
              onClick={handleCloseMenu}
            >
              <MenuItem onClick={() => setConfirmOpen(true)}>
                <ListItemIcon>
                  <DeleteOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
          <Chip
            label={`${totalCount} item${totalCount === 1 ? "" : "s"}`}
            size="small"
            variant="outlined"
            color="primary"
          />
        </CardContent>
      </Card>
      <ConfirmDialog
        open={confirmOpen}
        title="Are you sure to delete the collection?"
        loading={status === AsyncStatus.LOADING}
        onConfirm={deleteCollection}
        onCancel={() => setConfirmOpen(false)}
      />
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
    </>
  );
}
