import React from "react";
import { Link } from "react-router-dom";

const ChannelItem = ({ channel }) => {
  return (
    <div className="card">
      <Link to={`/channel/${channel.snippet.resourceId.channelId}`}>
        <div className="pt-3 d-flex justify-content-center">
          <img
            src={channel.snippet.thumbnails.medium.url}
            alt={channel.title}
            className="card-img-top rounded-circle"
            style={{ width: "80%", height: "auto" }}
          />
        </div>
      </Link>
      <div className="card-body">
        <Link to={`/channel/${channel.snippet.resourceId.channelId}`}>
          <h5 className="card-title text-center">{channel.snippet.title}</h5>
        </Link>
      </div>
    </div>
  );
};

export default ChannelItem;
