import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { RequireAuth } from "../components/RequireAuth";
import { RequireLoginPage } from "../components/RequireLoginPage";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { NoContent } from "../components/NoContent";
import { VideoItem } from "../components/VideoItem";
import { ChannelItem } from "../components/ChannelItem";
import { PlayListItem } from "../components/PlayListItem";
import { useCollection } from "../features/collection/useCollection";
import { AsyncStatus } from "../settings/types";

export default function CollectionDetails() {
  const { id = "" } = useParams();
  const { collection, status, error } = useCollection(id);

  return (
    <RequireAuth unAuthedComponent={<RequireLoginPage />}>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Collection
        {collection && (
          <Typography component="span" variant="h5" color="primary" sx={{ ml: 1 }}>
            {collection.name}
          </Typography>
        )}
      </Typography>
      {status === AsyncStatus.LOADING && <LoadingSpinner />}
      {status === AsyncStatus.SUCCESS && !collection && (
        <NoContent>Collection is unavailable</NoContent>
      )}
      {status === AsyncStatus.SUCCESS &&
        collection &&
        collection.items.length === 0 && (
          <NoContent>No items in the collection</NoContent>
        )}
      {status === AsyncStatus.SUCCESS &&
        collection &&
        collection.items.length > 0 && (
          <Box
            sx={{
              pb: 2,
              px: {
                xs: 0,
                lg: 5,
              },
            }}
          >
            {collection.items.map((item, index) => (
              <Box key={`${item.type}-${item.itemId}`}>
                {item.type === "video" ? (
                  <VideoItem
                    video={{
                      id: item.itemId,
                      title: item.title,
                      channelId: item.channelId,
                      channelTitle: item.channelTitle,
                      imageUrl: item.imageUrl,
                    }}
                    collectionId={collection.id}
                  />
                ) : item.type === "channel" ? (
                  <ChannelItem
                    channel={{
                      id: item.itemId,
                      title: item.title,
                      imageUrl: item.imageUrl,
                    }}
                    collectionId={collection.id}
                  />
                ) : item.type === "playlist" ? (
                  <PlayListItem
                    playlist={{
                      id: item.itemId,
                      title: item.title,
                      imageUrl: item.imageUrl,
                      channelId: item.channelId,
                      channelTitle: item.channelTitle,
                    }}
                    collectionId={collection.id}
                  />
                ) : null}
                {index < collection.items.length - 1 && (
                  <Divider sx={{ my: 1 }} />
                )}
              </Box>
            ))}
          </Box>
        )}
    </RequireAuth>
  );
}
