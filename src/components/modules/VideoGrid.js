import React from "react";
import VideoGridItem from "./VideoGridItem";

const renderGrid = videos => {
  return videos.map((video, index) => {
    return <VideoGridItem key={index} video={video} />;
  });
};

const VideoGrid = ({ videos }) => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
    gap: "1.8rem"
  };
  return <div style={gridStyle}> {renderGrid(videos)}</div>;
};

export default VideoGrid;
