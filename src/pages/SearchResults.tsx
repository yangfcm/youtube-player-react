import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useSearchResults } from "../features/search/useSearchResults";
import { MoreButton } from "../components/MoreButton";
import { ErrorMessage } from "../components/ErrorMessage";
import { AsyncStatus } from "../settings/types";
import { VideoItem } from "../components/VideoItem";
import { ChannelItem } from "../components/ChannelItem";
import { PlayListItem } from "../components/PlayListItem";
import { VideoSnippet } from "../features/video/types";
import { ChannelSnippet } from "../features/channel/types";
import { PlayListSnippet } from "../features/playlist/types";

export function SearchResults() {
  const location = useLocation();
  const query = location.search.substring(1);
  const vars = query.split("&");
  let q = "";
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === "q") {
      q = decodeURIComponent(pair[1]);
      break;
    }
  }
  const { searchResults, status, error, fetchMore, hasMore, queryChanged } =
    useSearchResults(q);

  if (
    (!searchResults?.length || queryChanged) &&
    status === AsyncStatus.LOADING
  ) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        pb: 2,
        px: {
          xs: 0,
          lg: 5,
        },
      }}
    >
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      {searchResults &&
        searchResults.map((result, index) => {
          if (typeof result.id === "string") return null;
          const kind = result.id.kind.split("#")[1];
          if (kind === "video") {
            return <VideoItem key={index} video={result as VideoSnippet} />;
          }
          if (kind === "channel") {
            return (
              <ChannelItem key={index} channel={result as ChannelSnippet} />
            );
          }
          if (kind === "playlist") {
            return (
              <PlayListItem key={index} playList={result as PlayListSnippet} />
            );
          }
          return null;
        })}
      {hasMore && (
        <MoreButton
          loading={status === AsyncStatus.LOADING}
          onClick={fetchMore}
        >
          More
        </MoreButton>
      )}
    </Box>
  );
}