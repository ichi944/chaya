import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

class SignupComplete extends Component {
  render() {
    return (
      <div>
        <Paper className="login-form" zDepth={1}>
          <div className="login-inner">
            <h1 className="login-title">Thank you</h1>
            <p>We sent a verification mail to you. please check it and verify.</p>
          </div>
        </Paper>
      </div>
    );
  }
}

export default SignupComplete;
