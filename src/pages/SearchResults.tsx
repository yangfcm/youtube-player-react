import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useLocation } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useSearchResults } from "../features/search/useSearchResults";
import { MoreButton } from "../components/MoreButton";
import { ErrorMessage } from "../components/ErrorMessage";
import { AsyncStatus } from "../settings/types";
import { VideoItem } from "../components/VideoItem";
import { ChannelItem } from "../components/ChannelItem";
import { PlayListItem } from "../components/PlayListItem";
import { VideoId } from "../features/video/types";
import { ChannelSnippet } from "../features/channel/types";
import { PlayListSnippet, PlayListId } from "../features/playlist/types";
import { getSearchString } from "../app/utils";

export default function SearchResults() {
  const location = useLocation();
  const q = getSearchString(location.search, "q");
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
          return (
            <Box key={index}>
              {kind === "video" ? (
                <VideoItem
                  video={{
                    id: (result.id as VideoId).videoId,
                    title: result.snippet.title,
                    channelId: result.snippet.channelId,
                    channelTitle: result.snippet.channelTitle,
                    publishedAt: result.snippet.publishedAt,
                    imageUrl: result.snippet.thumbnails?.high?.url,
                  }}
                />
              ) : kind === "channel" ? (
                <ChannelItem
                  channel={{
                    id: (result as ChannelSnippet).id.channelId,
                    title: result.snippet.title,
                    imageUrl: result.snippet.thumbnails?.high?.url,
                    description: result.snippet.description,
                  }}
                />
              ) : kind === "playlist" ? (
                <PlayListItem
                  playlist={{
                    id: ((result as PlayListSnippet).id as PlayListId)
                      .playlistId,
                    title: result.snippet.title,
                    imageUrl: result.snippet.thumbnails?.high?.url,
                    channelId: result.snippet.channelId,
                    channelTitle: result.snippet.channelTitle,
                    publishedAt: result.snippet.publishedAt,
                  }}
                />
              ) : null}
              <Divider sx={{ my: 1 }} />
            </Box>
          );
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
