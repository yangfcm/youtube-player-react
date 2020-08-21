import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserImage from "../common/UserImage";
import SearchForm from "../common/SearchForm";
import GoogleAuth from "../modules/GoogleAuth";

class Header extends React.Component {
  state = {
    user: null,
  };

  handleSignin = () => {
    this.props.googleSignin();
  };

  render() {
    return (
      <nav className="navbar navbar-light bg-light mb-4">
        <Link to="/" className="navbar-brand">
          <FontAwesomeIcon
            icon="video"
            size="lg"
            style={{ color: "#FF0101" }}
          />
          <span className="font-weight-bold mx-2 d-none d-sm-inline">
            FanTube{" "}
          </span>
        </Link>
        <div className="flex-grow-1 d-flex align-items-center justify-content-end">
          <SearchForm />
          {this.props.auth.signedIn === true && (
            <UserImage user={this.props.auth.user} />
          )}
          {this.props.auth.signedIn === false && (
            <div
              style={{ height: "55px" }}
              className="d-flex align-items-center"
            >
              <button className="btn btn-primary" onClick={this.handleSignin}>
                <FontAwesomeIcon icon="sign-in-alt" />
                {"   "}
                Sign In
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(GoogleAuth(Header));
