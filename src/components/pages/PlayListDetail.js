import React from "react";

class PlayListDetail extends React.Component {
  render() {
    return <div>PlayListDetail - {this.props.match.params.id} </div>;
  }
}

export default PlayListDetail;
