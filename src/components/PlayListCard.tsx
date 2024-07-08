import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import placeholder from "../images/placeholder-item.jpg";
import { LazyImage } from "./LazyImage";

type PlaylistPropsType = {
  id: string;
  title: string;
  imageUrl?: string;
  videoCount?: number;
  privacy?: string;
};

export function PlayListCard({ playlist }: { playlist: PlaylistPropsType }) {
  const { id, title, imageUrl, videoCount, privacy } = playlist;
  return (
    <Card>
      <Link to={`/playlist/${id}`}>
        <LazyImage
          src={imageUrl || placeholder}
          style={{ width: "100%", height: "auto" }}
          ratio="3:2"
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
          <Chip
            label={`${videoCount} videos`}
            size="small"
            variant="outlined"
            color="primary"
          />
        )}
        {privacy && (
          <Typography variant="caption" sx={{ ml: 1 }}>
            <Chip label={privacy} size="small" variant="outlined"></Chip>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
