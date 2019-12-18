import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VideoListItem = ({ video, playlistId }) => {
  let linkUrl = `/video/${video.snippet.resourceId.videoId}`;
  if (playlistId) linkUrl += `?playlistId=${playlistId}`;
  return (
    <div className="d-flex flex-md-row my-2">
      <div className="d-flex align-items-center">
        <Link to={linkUrl}>
          <img
            src={
              video.snippet.thumbnails && video.snippet.thumbnails.default.url
            }
            alt={video.title}
          />
        </Link>
      </div>
      <div className="d-flex flex-column justify-content-center ml-3">
        <Link to={linkUrl}>
          <h6 className="text-primary font-weight-bold">
            {video.snippet.title}
          </h6>
        </Link>
        <p className="font-weight-light">
          <FontAwesomeIcon icon="user-clock" />{" "}
          {moment(video.snippet.publishedAt).format("D MMM YYYY k:mm")}
        </p>
      </div>
    </div>
  );
};

export default VideoListItem;
