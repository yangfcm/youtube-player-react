import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardContent from "@mui/material/CardContent";
import placeholder from "../images/placeholder-item.jpg";

type PlaylistPropsType = {
  id: string;
  title: string;
  imageUrl?: string;
  videoCount?: number;
};

export function PlayListCard({ playlist }: { playlist: PlaylistPropsType }) {
  const { id, title, imageUrl, videoCount } = playlist;
  return (
    <Card>
      <Link to={`/playlist/${id}`}>
        <img
          src={imageUrl || placeholder}
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
            display: "block",
            lineHeight: "20px",
            height: "40px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mb: 1,
          }}
        >
          {title}
        </MuiLink>
        {videoCount !== undefined && (
          <Chip label={`${videoCount} videos`} size="small" />
        )}
      </CardContent>
    </Card>
  );
}
