import React from "react";

class ChannelDetail extends React.Component {
  render() {
    return <div>Channeldetail - {this.props.match.params.id} </div>;
  }
}

export default ChannelDetail;
