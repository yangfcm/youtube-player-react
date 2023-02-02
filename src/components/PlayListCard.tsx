import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";

export function PlayListCard({
  id,
  title,
  imageUrl,
  videoCount,
}: {
  id: string;
  title: string;
  imageUrl: string;
  videoCount: number;
}) {
  return (
    <Card>
      <Link to={`/playlist/${id}`}>
        <img
          src={imageUrl}
          alt={title}
          title={title}
          style={{ width: "100%", height: "auto" }}
        />
      </Link>
      <CardContent>
        <MuiLink
          component={Link}
          to={`/playlist/${id}`}
          underline="none"
          sx={{
            display: "flex",
            lineHeight: "20px",
            maxHeight: "40px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mb: 1,
            alignItems: "center",
          }}
        >
          {title}
        </MuiLink>
        <Chip label={`${videoCount} videos`} size="small" />
      </CardContent>
    </Card>
  );
}
