import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';

class VerifyUser extends Component {
  componentDidMount() {
    const { token } = this.props.match.params;
    console.log('@VerifyUser', token);
    this.props.handleVerifyUser(token);
  }
  render() {
    const { isRequesting, isVerified } = this.props.verifyUser;
    if (isRequesting) {
      return (
        <div>
          <Paper className="login-form" elevation={1}>
            <div className="login-inner">
              <p>now checking....</p>
            </div>
          </Paper>
        </div>
      );
    }
    if (isVerified) {
      return (
        <div>
          <Paper className="login-form" elevation={1}>
            <div className="login-inner">
              <h1 className="login-title">
                Mail Verification is done.
              </h1>
              <p>Please wait the administrator verify you.</p>
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
        <Paper className="login-form" elevation={1}>
          <div className="login-inner">
            <h1 className="login-title">Verification Failed.</h1>
            <p>Please check the link on the email.</p>
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
