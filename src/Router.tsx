import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Subscriptions } from "./pages/Subscriptions";
import { SearchResults } from "./pages/SearchResults";
import { Video } from "./pages/Video";
import { PlayLists } from "./pages/PlayLists";
import { PlayListVideos } from "./pages/PlayListVideos";
import { Channel } from "./pages/Channel";

export function Router() {
  return (
    <Routes>
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/playlist/:id" element={<PlayListVideos />} />
      <Route path="/playlists" element={<PlayLists />} />
      <Route path="/video/:id" element={<Video />} />
      <Route path="/channel/:id" element={<Channel />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
