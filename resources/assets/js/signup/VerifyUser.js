import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Paper from 'material-ui/Paper';

class VerifyUser extends Component {
  componentDidMount() {
    const { token } = this.props.match.params;
    console.log('@VerifyUser', token);
    this.props.handleVerifyUser(token)
  }
  render() {
    const {
      isRequesting,
      isVerified,
    } = this.props.verifyUser;
    if (isRequesting) {
      return (
        <div>...checking</div>
      );
    }
    if (isVerified) {
      return (
        <div>
          <Paper className="login-form" zDepth={1}>
            <div className="login-inner">
              <h1 className="login-title">You are Verified.</h1>
              <div className="login-links">
                <Link to="/app/login">go to Login</Link>
              </div>
            </div>
          </Paper>
        </div>
      );
    }
    return (
      <div>
        <Paper className="login-form" zDepth={1}>
          <div className="login-inner">
            <h1 className="login-title">Verification Failed.</h1>
            <p>Please check a link on the email.</p>
            <div className="login-links">
              <Link to="/app/signup">go to signup</Link>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default VerifyUser;