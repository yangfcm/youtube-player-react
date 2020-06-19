import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut } from "../../actions/auth";

class GoogleAuth extends React.Component {
  componentDidMount() {
    if (!window.gapi) {
      return;
    }
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope:
            "email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get());
    } else {
      this.props.signOut();
    }
  };

  handleSignout = () => {
    this.auth.signOut();
  };

  handleSignin = () => {
    this.auth.signIn();
  };

  renderAuthButton() {
    // console.log(this.props.auth);
    if (this.props.auth.signedIn === null) {
      return;
    }
    if (this.props.auth.signedIn === true) {
      return (
        <li
          style={{ cursor: "pointer" }}
          className="list-group-item list-group-item-warning"
          onClick={this.handleSignout}
        >
          <FontAwesomeIcon icon="sign-out-alt" />
          {"   "}
          Sign out
        </li>
      );
    } else {
      return (
        <button className="btn btn-primary" onClick={this.handleSignin}>
          <FontAwesomeIcon icon="sign-in-alt" />
          {"   "}
          Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
