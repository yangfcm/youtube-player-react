import React from "react";
import VideoListItem from "../modules/VideoListItem";

const renderList = (videoList, playlistId) => {
  return videoList.map((video, index) => {
    return <VideoListItem key={index} video={video} playlistId={playlistId} />;
  });
};

const VideoList = ({ videoList, playlistId }) => {
  return <div>{renderList(videoList, playlistId)}</div>;
};

export default VideoList;
