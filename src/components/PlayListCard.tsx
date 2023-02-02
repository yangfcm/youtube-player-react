import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export function PlayListCard({
  id,
  title,
  imageUrl,
}: {
  id: string;
  title: string;
  imageUrl: string;
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
            justifyContent: "center",
          }}
        >
          {title}
        </MuiLink>
      </CardContent>
    </Card>
  );
}
