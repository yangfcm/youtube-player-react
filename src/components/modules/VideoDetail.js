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

      <div className="d-flex justify-content-between text-muted">
        <div>
          Published at{" "}
          {moment(video.snippet.publishedAt).format("D MMM YYYY k:mm")} |{" "}
          {separateNumber(video.statistics.viewCount)} Views
        </div>
        <div>
          <span className="mr-3">
            <FontAwesomeIcon icon="thumbs-up" />
            &nbsp;
            {separateNumber(video.statistics.likeCount)}{" "}
          </span>
          <span>
            <FontAwesomeIcon icon="thumbs-down" />
            &nbsp;
            {separateNumber(video.statistics.dislikeCount)}
          </span>
        </div>
      </div>
      <hr />
      <p
        dangerouslySetInnerHTML={{ __html: video.snippet.description }}
        style={{ overflow: "hidden" }}
      ></p>
    </div>
  );
};

export default VideoDetail;
