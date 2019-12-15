import React from "react";
import { Link } from "react-router-dom";

const PlayListItem = ({ playlist }) => {
  return (
    <div className="card">
      <Link>
        <img
          src={playlist.snippet.thumbnails.medium.url}
          alt={playlist.snippet.title}
          className="card-img-top"
        />
      </Link>
      <div className="card-body">
        <Link>
          <p className="card-text">
            {playlist.snippet.title}&nbsp;
            <br />
            <span className="badge badge-primary badge-pill">
              {playlist.contentDetails.itemCount} videos
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PlayListItem;
