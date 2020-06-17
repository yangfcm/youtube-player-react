import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import VideoListItem from "./VideoListItem";

/** Search result has three types: video, playlist and channel
 * Render them using different layout and styles based on their types
 */
const renderVideoItem = (video) => {
  return <VideoListItem video={video} />;
};

const renderChannelItem = (channel) => {
  const linkUrl = `/channel/${channel.id.channelId}`;
  return (
    <div className="d-flex flex-md-row my-3">
      <div className=" d-flex align-items-center justify-content-center">
        <Link to={linkUrl}>
          <img
            src={
              channel.snippet.thumbnails &&
              channel.snippet.thumbnails.medium.url
            }
            alt={channel.title}
            style={{ borderRadius: "50%", maxWidth: "120px" }}
          />
        </Link>
      </div>
      <div className=" d-flex flex-column justify-content-center ml-3">
        <Link to={linkUrl}>
          <h6 className="text-primary font-weight-bold">
            {channel.snippet.title}
          </h6>
        </Link>
        <p className="font-weight-light">{channel.snippet.description}</p>
      </div>
    </div>
  );
};

const renderPlaylistItem = (playlist) => {
  return (
    <div className="d-flex flex-md-row my-2">
      <div
        className="d-flex align-items-center"
        style={{ position: "relative" }}
      >
        <Link to={`/playlist/${playlist.id.playlistId}`}>
          <img
            src={
              playlist.snippet.thumbnails &&
              playlist.snippet.thumbnails.medium.url
            }
            alt={playlist.title}
            style={{ maxWidth: "140px" }}
          />
          <div
            style={{
              position: "absolute",
              zIndex: "10",
              height: "100%",
              width: "100%",
              background: "rgba(0,0,0, .4)",
              color: "white",
              top: "0",
            }}
            className="d-flex justify-content-center align-items-center"
          >
            {" "}
            <FontAwesomeIcon icon={"list"} />
            {"  "} Play List
          </div>
        </Link>
      </div>
      <div className="d-flex flex-column justify-content-center ml-3">
        <Link to={`/playlist/${playlist.id.playlistId}`}>
          <h6 className="text-primary font-weight-bold">
            {playlist.snippet.title}
          </h6>
        </Link>
        <Link to={`/channel/${playlist.snippet.channelId}`}>
          {" "}
          {playlist.snippet.channelTitle}
        </Link>
      </div>
    </div>
  );
};

const SearchItem = ({ item }) => {
  // console.log(item);
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
