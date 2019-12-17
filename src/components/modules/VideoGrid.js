import React from "react";
import VideoGridItem from "./VideoGridItem";

const renderGrid = videos => {
  return videos.map(video => {
    return <VideoGridItem key={video.id} video={video} />;
  });
};

const VideoGrid = ({ videos }) => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
    gap: "1.2rem"
  };
  return <div style={gridStyle}> {renderGrid(videos)}</div>;
};

export default VideoGrid;
