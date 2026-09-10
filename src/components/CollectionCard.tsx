import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import placeholder from "../images/placeholder-item.jpg";
import { LazyImage } from "./LazyImage";
import { CollectionSnippet } from "../features/collection/types";

export function CollectionCard({
  collection,
}: {
  collection: CollectionSnippet;
}) {
  const { name, thumbnail, totalCount } = collection;
  return (
    <Card>
      <LazyImage
        src={thumbnail || placeholder}
        alt={name}
        title={name}
        style={{ width: "100%", height: "auto" }}
        ratio="3:2"
      />
      <CardContent>
        <Typography
          sx={{
            lineHeight: "20px",
            height: "40px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mb: 1,
          }}
        >
          {name}
        </Typography>
        <Chip
          label={`${totalCount} item${totalCount === 1 ? "" : "s"}`}
          size="small"
          variant="outlined"
          color="primary"
        />
      </CardContent>
    </Card>
  );
}
