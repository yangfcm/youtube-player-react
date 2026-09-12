import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { LazyImage } from "./LazyImage";
import { ConfirmDialog } from "./ConfirmDialog";
import { ErrorMessage } from "./ErrorMessage";
import { MoreOptionsButton } from "./MoreOptionsButton";
import { CollectionSnippet } from "../features/collection/types";
import { useDeleteCollection } from "../features/collection/useDeleteCollection";
import { AsyncStatus } from "../settings/types";
import placeholder from "../images/placeholder-item.jpg";
import { EditCollectionModal } from "./EditCollectionModal";

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

  const [editOpen, setEditOpen] = useState(false);
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
            <MoreOptionsButton
              ariaLabel="Collection options"
              onClick={handleOpenMenu}
            />
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleCloseMenu}
              onClick={handleCloseMenu}
            >
              <MenuItem onClick={() => setEditOpen(true)}>
                <ListItemIcon>
                  <EditOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
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

      <EditCollectionModal
        collection={collection}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
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
