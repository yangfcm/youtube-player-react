import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import VideoListItem from "./VideoListItem";

const renderVideoItem = (video) => {
  return <VideoListItem video={video} />;
};

const renderChannelItem = (channel) => {
  const linkUrl = `/channel/${channel.id.channelId}`;
  return (
    <div className="d-flex flex-md-row my-2">
      <div className="d-flex align-items-center justify-content-center">
        <Link to={linkUrl}>
          <img
            src={
              channel.snippet.thumbnails &&
              channel.snippet.thumbnails.default.url
            }
            alt={channel.title}
            style={{ borderRadius: "50%" }}
          />
        </Link>
      </div>
      <div className="d-flex flex-column justify-content-center ml-3">
        <Link to={linkUrl}>
          <h6 className="text-primary font-weight-bold">
            {channel.snippet.title}
          </h6>
        </Link>
        <p className="font-weight-light">
          <FontAwesomeIcon icon="user-clock" />{" "}
          {moment(channel.snippet.publishedAt).format("D MMM YYYY k:mm")}
        </p>
      </div>
    </div>
  );
};

const renderPlaylistItem = (playlist) => {
  return <div>playlist</div>;
};

const SearchItem = ({ item }) => {
  console.log(item);
  const kind = item.id.kind.split("#")[1];
  return (
    <React.Fragment>
      {kind === "video" && renderVideoItem(item)}
      {kind === "channel" && renderChannelItem(item)}
      {kind === "playlist" && renderPlaylistItem(item)}
    </React.Fragment>
  );
};

export default SearchItem;
