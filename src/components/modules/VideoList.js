import React from "react";
import VideoListItem from "../modules/VideoListItem";

const renderList = (videoList, playlistId) => {
  return videoList.map((video, index) => {
    if (video.snippet) {
      // There are a few videos returned from Google doesn't have snippet property. For these videos, do not render them.
      return (
        <VideoListItem key={index} video={video} playlistId={playlistId} />
      );
    }
    return null;
  });
};

const VideoList = ({ videoList, playlistId }) => {
  return <div>{renderList(videoList, playlistId)}</div>;
};

export default VideoList;
