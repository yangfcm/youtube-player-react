import React from "react";
import moment from "moment";

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

const VideoPlayer = ({ video }) => {
  const videoSrc = `https://www.youtube.com/embed/${video.contentDetails.videoId}`;

  return (
    <div>
      <div style={stylePlayerContainer}>
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
