import * as React from 'react';
import Paper from '@material-ui/core/Paper';

class SignupComplete extends React.Component {
  render() {
    return (
      <div>
        <Paper className="login-form" elevation={1}>
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
