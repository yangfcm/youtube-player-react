import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { separateNumber } from "../../utils/helper";

const VideoDetail = ({ video }) => {
  // console.log(video);
  return (
    <div>
      <div className="mb-3">
        <h3 className="text-primary">{video.snippet.title}</h3>
        <Link to={`/channel/${video.snippet.channelId}`}>
          {video.snippet.channelTitle}
        </Link>
      </div>

      <div className="d-flex flex-column flex-sm-row justify-content-between text-muted">
        <div id="video-mega-info">
          <FontAwesomeIcon icon="user-clock" />{" "}
          {moment(video.snippet.publishedAt).format("D MMM YYYY k:mm")} |{" "}
          <FontAwesomeIcon icon="eye" />{" "}
          {separateNumber(video.statistics.viewCount)}
        </div>
        {video.statistics.likeCount && video.statistics.dislikeCount && (
          <div id="video-stat-info">
            <span className="mr-3">
              <FontAwesomeIcon icon="thumbs-up" />{" "}
              {separateNumber(video.statistics.likeCount)}{" "}
            </span>
            <span>
              <FontAwesomeIcon icon="thumbs-down" />{" "}
              {separateNumber(video.statistics.dislikeCount)}
            </span>
          </div>
        )}
      </div>
      <hr />
      <p
        id="video-description"
        dangerouslySetInnerHTML={{ __html: video.snippet.description }}
        style={{ overflow: "hidden" }}
      ></p>
    </div>
  );
};

export default VideoDetail;
