import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { separateNumber } from "../../utils/helper";

const VideoGridItem = ({ video }) => {
  return (
    <div>
      <div className="mb-2">
        <Link to={`/video/${video.id.videoId || video.id}`}>
          <img
            style={{ width: "100%", height: "auto" }}
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            title={video.snippet.title}
          />
        </Link>
      </div>
      <div>
        <div
          style={{
            lineHeight: "23px",
            maxHeight: "46px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          className="mb-1"
        >
          <Link
            to={`/video/${video.id.videoId || video.id}`}
            title={video.snippet.title}
          >
            {video.snippet.title}
          </Link>
        </div>
        <div className="mb-2">
          <Link to={`/channel/${video.snippet.channelId}`}>
            <span className="text-secondary">{video.snippet.channelTitle}</span>
          </Link>
        </div>
        {
          <div className="text-muted">
            {video.statistics && (
              <span>{separateNumber(video.statistics.viewCount)} Views |</span>
            )}{" "}
            {moment(video.snippet.publishedAt).fromNow()}
          </div>
        }
      </div>
    </div>
  );
};

export default VideoGridItem;
