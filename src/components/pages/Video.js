import React from "react";
import { connect } from "react-redux";
import queryString from "query-string";

import VideoPlay from "../modules/VideoPlayer";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

import { fetchVideo, fetchPlaylistDetail, clearError } from "../../actions/app";

class Video extends React.Component {
  componentDidMount = async () => {
    const videoId = this.props.match.params.id;
    const playlistId = queryString.parse(this.props.location.search).playlistId;
  };

  render() {
    return <div> Video - {this.props.match.params.id} </div>;
  }
}

export default Video;
