import React from "react";

const VideoPlayer = ({ videoId }) => {
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;
  const stylePlayerContainer = {
    position: "relative",
    maxWidth: "100%",
    height: "0",
    overflow: "hidden",
    background: "#dcddde",
    paddingBottom: "62%"
  };

  const stylePlayer = {
    width: "100%",
    height: "100%",
    position: "absolute"
  };

  return (
    <div>
      <div style={stylePlayerContainer} className="mb-3">
        <iframe
          src={videoSrc}
          alt="video"
          title="video player"
          style={stylePlayer}
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
