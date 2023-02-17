import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Subscriptions } from "./pages/Subscriptions";
import { SearchResults } from "./pages/SearchResults";
import { Video } from "./pages/Video";
import { PlayLists } from "./pages/PlayLists";
import { PlayListVideos } from "./pages/PlayListVideos";
import { Channel } from "./pages/Channel";
import { ChannelVideos } from "./pages/ChannelVideos";
import { ChannelPlayLists } from "./pages/ChannelPlayLists";
import { NotFound } from "./pages/NotFound";

export function Router() {
  return (
    <Routes>
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/playlist/:id" element={<PlayListVideos />} />
      <Route path="/playlists" element={<PlayLists />} />
      <Route path="/video/:id" element={<Video />} />
      <Route path="/channel/:id" element={<Channel />}>
        <Route index element={<Navigate replace to="videos" />} />
        <Route path="videos" element={<ChannelVideos />} />
        <Route path="playlists" element={<ChannelPlayLists />} />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
