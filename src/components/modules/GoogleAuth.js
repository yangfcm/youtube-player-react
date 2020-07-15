import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../actions/auth";

const GoogleAuth = (WrappedComponent) => {
  class GoogleAuthWrapper extends React.Component {
    state = {
      user: null,
    };

    constructor(props) {
      super(props);
      if (!window.gapi) {
        return;
      }
      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            clientId: process.env.REACT_APP_CLIENT_ID,
            scope:
              "email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl",
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
        this.setState({
          user: this.auth.currentUser.get(),
        });
        this.props.signIn(this.state.user);
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

    render() {
      return (
        <WrappedComponent
          googleUser={this.state.user}
          googleSignin={this.handleSignin}
          googleSignout={this.handleSignout}
          {...this.props}
        />
      );
    }
  }

  return connect(null, { signIn, signOut })(GoogleAuthWrapper);
};

// export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
export default GoogleAuth;

// class GoogleAuth extends React.Component {
//   componentDidMount() {
//     if (!window.gapi) {
//       return;
//     }
//     window.gapi.load("client:auth2", () => {
//       window.gapi.client
//         .init({
//           clientId: process.env.REACT_APP_CLIENT_ID,
//           scope:
//             "email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl",
//         })
//         .then(() => {
//           this.auth = window.gapi.auth2.getAuthInstance();
//           this.onAuthChange(this.auth.isSignedIn.get());
//           this.auth.isSignedIn.listen(this.onAuthChange);
//         });
//     });
//   }

//   onAuthChange = (isSignedIn) => {
//     if (isSignedIn) {
//       if (!this.props.auth.signedIn) {
//         this.props.signIn(this.auth.currentUser.get());
//       }
//     } else {
//       this.props.signOut();
//     }
//   };

//   handleSignout = () => {
//     this.auth.signOut();
//   };

//   handleSignin = () => {
//     this.auth.signIn();
//   };

//   renderAuthButton() {
//     // console.log(this.props.auth);
//     if (this.props.auth.signedIn === null) {
//       return;
//     }
//     if (this.props.auth.signedIn === true) {
//       return (
//         <li
//           style={{ cursor: "pointer" }}
//           className="list-group-item list-group-item-warning"
//           onClick={this.handleSignout}
//         >
//           <FontAwesomeIcon icon="sign-out-alt" />
//           {"   "}
//           Sign out
//         </li>
//       );
//     } else {
//       return (
//         <button className="btn btn-primary" onClick={this.handleSignin}>
//           <FontAwesomeIcon icon="sign-in-alt" />
//           {"   "}
//           Sign In
//         </button>
//       );
//     }
//   }

//   render() {
//     return <div>{this.renderAuthButton()}</div>;
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth,
//   };
// };

// export default connect(mapStateToProps, {
//   signIn,
//   signOut,
// })(GoogleAuth);
